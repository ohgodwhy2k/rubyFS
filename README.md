# Meet RubyFS

## Overview

RubyFS (originally LiFS/Lithium FS) is a powerful **in-memory file system extension** designed for use in Scratch and Turbowarp projects. It provides a familiar, structured file system environment, allowing projects to create, read, write, list, and manage files and directories using standard path-based operations (e.g., `/folder/file.txt`).

This extension is ideal for creating complex projects like text-based adventures, persistent local data managers, or even operating system simulations within a Scratch environment.

## Key Features

- **Hierarchical Structure:** Supports nested directories (e.g., `/usr/bin/`).
- **Core File Operations:** Blocks for `create`, `delete`, `open` (read), and `set` (write).
- **Path Utilities:** Blocks for `exists?`, `is file?`, `is directory?`, `file name`, and `directory of`.
- **Management & Metadata:**
- **Permissions:** Granular control over `read`, `write`, `delete`, `create`, `see`, and `control` permissions.
- **Size Limits:** Set size restrictions on directories in bytes to prevent runaway data growth.
- **Timestamps:** Access `date created`, `date modified`, and `date accessed` for any entry.
- **Import/Export:** Full file system data can be easily converted to a **JSON string** for saving, sharing, or loading persistent data.

## Blocks Reference

Here is a summary of the main blocks provided by RubyFS:

### File and Directory Manipulation

| Block                       | Type     | Description                                                                                                         |
| :-------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------ |
| `create [path]`             | Command  | Creates a new file or directory at `path`. Directories must end with a `/`. Recursively creates parent directories. |
| `set [path] to [content]`   | Command  | Writes `content` to the file at `path`. If the file does not exist, it is created.                                  |
| `open [path]`               | Reporter | Returns the content of the file at `path`, or an empty string if not found or if it's a directory.                  |
| `delete [path]`             | Command  | Deletes the file or directory at `path`. Deleting a directory is **recursive** (deletes all children).              |
| `rename [path1] to [path2]` | Command  | Moves or renames a file or directory.                                                                               |
| `copy [path1] to [path2]`   | Command  | Recursively copies a file or directory.                                                                             |
| `list [type] under [path]`  | Reporter | Returns a list of files, directories, or all entries in the given path.                                             |

---

### Status and Utility

| Block                    | Type     | Description                                                                  |
| :----------------------- | :------- | :--------------------------------------------------------------------------- |
| `does [path] exist?`     | Boolean  | Checks if a file or directory exists.                                        |
| `is [path] a file?`      | Boolean  | Checks if the entry at `path` is a file.                                     |
| `is [path] a directory?` | Boolean  | Checks if the entry at `path` is a directory.                                |
| `file name of [path]`    | Reporter | Returns the name of the file/directory (e.g., `/test/foo.txt` -> `foo.txt`). |
| `directory of [path]`    | Reporter | Returns the parent directory (e.g., `/test/foo.txt` -> `/test/`).            |
| `last error`             | Reporter | Returns the message of the last failed operation.                            |
| `was written?`           | Boolean  | Reports if a file was written to since the last check, then resets.          |
| `was read?`              | Boolean  | Reports if a file was read from since the last check, then resets.           |

---

### System Management

| Block                                 | Type     | Description                                                            |
| :------------------------------------ | :------- | :--------------------------------------------------------------------- |
| `clear the file system`               | Command  | Resets the entire file system to a single root `/`.                    |
| `export file system`                  | Reporter | Returns the entire file system data as a JSON string.                  |
| `import file system from [data]`      | Command  | Overwrites the current file system with the data from the JSON string. |
| `set size limit for [dir] to [bytes]` | Command  | Sets a maximum content size for the directory and its children.        |
| `size limit of [dir] (bytes)`         | Reporter | Returns the size limit (`-1` if unlimited).                            |
| `current size of [dir] (bytes)`       | Reporter | Returns the total size of all file content within the directory tree.  |
