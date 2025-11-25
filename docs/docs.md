```
icon: ./icon.svg
title: RubyFS Documentation
version: 1.0.5
banner: https://images.unsplash.com/photo-1708533548050-16703eff12ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
color: #fc2853
```

RubyFS treats all paths as absolute, starting from the root directory `/`. Directories must end with a forward slash (`/`).

## File and Directory Operations

These blocks handle the creation, reading, writing, moving, and deletion of entries in the file system.

| Block                         | Type     | Arguments                                                         | Description                                                                                                                                                                                                    |
| :---------------------------- | :------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **create [path]**             | Command  | `[STR]` (Path)                                                    | Creates a **new file or directory** at the specified path. Directories are created if the path ends with a `/`. **Recursively creates** all non-existent parent directories. Fails if the path already exists. |
| **set [path] to [content]**   | Command  | `[STR]` (Path), `[STR2]` (Content)                                | **Writes** the given `content` to the file at `path`. If the file does not exist, it calls `create` internally to make the file and its path. Fails if the path is a directory.                                |
| **open [path]**               | Reporter | `[STR]` (Path)                                                    | **Reads** and returns the content of the file at `path`. Returns an **empty string (`""`)** if the entry is not found, is a directory, or if the user lacks **read** permission.                               |
| **delete [path]**             | Command  | `[STR]` (Path)                                                    | **Deletes** the file or directory at `path`. If `path` is a directory, the deletion is **recursive**, removing all files and subdirectories inside it.                                                         |
| **rename [path1] to [path2]** | Command  | `[STR]` (Source Path), `[STR2]` (Destination Path)                | **Moves** the entry from `path1` to `path2`. If `path1` is a directory, all children are moved as well. Fails if `path2` already exists.                                                                       |
| **copy [path1] to [path2]**   | Command  | `[STR]` (Source Path), `[STR2]` (Destination Path)                | **Copies** the entry from `path1` to `path2`. If `path1` is a directory, all contents are recursively copied. Fails if `path2` already exists.                                                                 |
| **list [type] under [path]**  | Reporter | `[TYPE]` (Menu), `[STR]` (Path)                                   | Returns a **list (Scratch list/array)** of all immediate children in the directory specified by `path`.                                                                                                        |
|                               |          | **`[TYPE]` Menu:**                                                |                                                                                                                                                                                                                |
|                               |          | - **`all`**: Lists all files and subdirectories.                  |                                                                                                                                                                                                                |
|                               |          | - **`files`**: Lists only files.                                  |                                                                                                                                                                                                                |
|                               |          | - **`directories`**: Lists only directories (names end with `/`). |                                                                                                                                                                                                                |

---

## Metadata and Path Utilities

These blocks allow you to check the type, name, location, and timestamps of file system entries.

| Block                       | Type     | Arguments      | Description                                                                                                                                                        |
| :-------------------------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **does [path] exist?**      | Boolean  | `[STR]` (Path) | Returns `true` if an entry exists at the specified path and the user has **see** permission, otherwise `false`.                                                    |
| **is [path] a file?**       | Boolean  | `[STR]` (Path) | Returns `true` if the entry exists and is a file (does not end with `/`).                                                                                          |
| **is [path] a directory?**  | Boolean  | `[STR]` (Path) | Returns `true` if the entry exists and is a directory (ends with `/`), including the root directory `/`.                                                           |
| **file name of [path]**     | Reporter | `[STR]` (Path) | Returns the name of the file or directory itself. E.g., for `/data/example.txt` returns `example.txt`. For `/data/` returns `data`.                                |
| **directory of [path]**     | Reporter | `[STR]` (Path) | Returns the **parent directory** of the path. E.g., for `/data/example.txt` or `/data/` returns `/data/`. For `/data/test/` returns `/data/`. For `/` returns `/`. |
| **date created of [path]**  | Reporter | `[STR]` (Path) | Returns the timestamp of when the entry was **created** as an ISO 8601 string (e.g., `2025-11-25T14:50:00.000Z`). Returns `""` if not found.                       |
| **date modified of [path]** | Reporter | `[STR]` (Path) | Returns the timestamp of the last time the entry's content or metadata was **changed** (write, rename, set perm, etc.).                                            |
| **date accessed of [path]** | Reporter | `[STR]` (Path) | Returns the timestamp of the last time the entry was **read or seen** (open, list, exists, etc.).                                                                  |

---

## Permissions and Limits

RubyFS supports a fine-grained permission system that applies per entry (file or directory).

| Block                                         | Type     | Arguments                                                              | Description                                                                                                                                                                                                                            |
| :-------------------------------------------- | :------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[ACTION] [PERM] permission for [path]**     | Command  | `[ACTION]`, `[PERM]`, `[STR]` (Path)                                   | Sets or removes a specific permission for the entry at `path`. If `path` is a directory, the permission change is applied **recursively** to all children. Requires **control** permission on the target.                              |
|                                               |          | **`[ACTION]` Menu:**                                                   |                                                                                                                                                                                                                                        |
|                                               |          | - **`add`**: Grants the permission (`true`).                           |                                                                                                                                                                                                                                        |
|                                               |          | - **`remove`**: Revokes the permission (`false`).                      |                                                                                                                                                                                                                                        |
|                                               |          | **`[PERM]` Menu:**                                                     |                                                                                                                                                                                                                                        |
|                                               |          | - **`create`**: Allows creating new children inside this directory.    |                                                                                                                                                                                                                                        |
|                                               |          | - **`delete`**: Allows deleting this entry.                            |                                                                                                                                                                                                                                        |
|                                               |          | - **`see`**: Allows listing/checking existence/metadata of this entry. |                                                                                                                                                                                                                                        |
|                                               |          | - **`read`**: Allows reading the content (using `open`).               |                                                                                                                                                                                                                                        |
|                                               |          | - **`write`**: Allows modifying the content (using `set`).             |                                                                                                                                                                                                                                        |
|                                               |          | - **`control`**: Allows changing permissions and size limits.          |                                                                                                                                                                                                                                        |
| **list permissions for [path]**               | Reporter | `[STR]` (Path)                                                         | Returns a **JSON string** detailing the six permissions for the entry at `path` (e.g., `{"read":true,"write":false,...}`).                                                                                                             |
| **set size limit for [dir] to [bytes] bytes** | Command  | `[DIR]` (Path), `[BYTES]` (Number)                                     | Sets a maximum file content size for the directory tree. The total size of all files under `[dir]` (including subdirectories) cannot exceed this limit. Set to `0` or less to fail all future writes. Use **remove limit** to disable. |
| **remove size limit for [dir]**               | Command  | `[DIR]` (Path)                                                         | Removes any previously set size limit, resetting it to unlimited (`-1`).                                                                                                                                                               |
| **size limit of [dir] (bytes)**               | Reporter | `[DIR]` (Path)                                                         | Returns the currently set maximum size in bytes (`-1` if unlimited).                                                                                                                                                                   |
| **current size of [dir] (bytes)**             | Reporter | `[DIR]` (Path)                                                         | Returns the total combined content size (in bytes) of all files within the directory and its subdirectories.                                                                                                                           |

---

## System Control and Diagnostics

These blocks manage the overall extension state, logging, and data persistence.

| Block                              | Type     | Arguments                     | Description                                                                                                                                                                              |
| :--------------------------------- | :------- | :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **clear the file system**          | Command  | (None)                        | **Wipes** the entire file system, leaving only the root directory `/` with default permissions. Requires **delete** permission on `/`.                                                   |
| **export file system**             | Reporter | (None)                        | Returns the entire file system data as a **JSON string**. This string can be used to save the file system state to a cloud variable, list, or local storage.                             |
| **import file system from [data]** | Command  | `[STR]` (JSON Data)           | **Overwrites** the current file system using the data provided in the JSON string. **Requires delete permission on `/`**. Supports importing data from older RubyFS (and LiFS) versions. |
| **turn [STATE] console logging**   | Command  | `[STATE]` (Menu)              | Toggles detailed debugging messages to the browser console. Use for advanced debugging.                                                                                                  |
|                                    |          | **`[STATE]` Menu:**           |                                                                                                                                                                                          |
|                                    |          | - **`on`**: Enable logging.   |                                                                                                                                                                                          |
|                                    |          | - **`off`**: Disable logging. |                                                                                                                                                                                          |
| **last error**                     | Reporter | (None)                        | Returns the error message (`lastError`) from the most recent failed operation (e.g., permission denied, size limit exceeded).                                                            |
| **was read?**                      | Boolean  | (None)                        | Reports `true` if any file or directory was successfully accessed/read since the last time this block was run, then resets the internal flag to `false`.                                 |
| **was written?**                   | Boolean  | (None)                        | Reports `true` if any file or directory was successfully modified/created since the last time this block was run, then resets the internal flag to `false`.                              |
| **version**                        | Reporter | (None)                        | Returns the current extension version number (`1.0.5`).                                                                                                                                  |
