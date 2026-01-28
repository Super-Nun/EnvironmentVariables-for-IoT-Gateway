# IoT Gateway Environment Configuration Script

This utility script automates the configuration of system environment variables and configuration files for an IoT Gateway. It reads values from a `.env` file and updates critical system files, ensuring consistency and reducing manual setup errors.

## 🚀 Features

*   **Automated System Configuration**: Updates `/etc/hostname` and `/etc/hosts` based on your environment settings.
*   **Application Environment Setup**: Generates `device.env` and `iotmonitor.env` for dependent applications.
*   **RPort Configuration**: Automatically generates a complete `rport.conf` file.
*   **Safe Backups**: Before modifying any file, the script creates a backup in a `blackUpEnv` directory within the target file's directory. This ensures you can always roll back if needed.

## 📋 Prerequisites

*   **Node.js**: Ensure Node.js is installed on your gateway.
*   **Root Privileges**: The script modifies system files (e.g., in `/etc/`), so it must be run with `sudo`.

## 📦 Installation

1.  Clone this repository or download the script files to your gateway.
2.  Install the required dependencies:

    ```bash
    npm install
    ```

## ⚙️ Configuration

1.  **Create your `.env` file**:
    You can create a new `.env` file or modify the existing one. This file contains all the configuration values the script will use.

    ```bash
    nano .env
    ```

2.  **Required Variables**:
    Ensure the following variables are defined in your `.env` file:

    | Variable | Description |
    | :--- | :--- |
    | `HOSTNAME` | The desired hostname for the gateway. |
    | `EDGE_CLUSTER` | Cluster identifier. |
    | `EDGE_ID` | Unique ID for the edge device. |
    | `EDGE_STATION` | Station name/ID. |
    | `EDGE_NUMBER` | Edge number. |
    | `CONFIG_DOWNLOAD_TOKEN` | Token for downloading configs. |
    | `GIT_USER` | Git username for sync. |
    | `GIT_PASS` | Git password/token for sync. |
    | `DOTENVENC_PASS` | Password for encrypted env files. |
    | `DOCKER` | Docker configuration/status. |
    | `RPORT_SERVER` | RPort server address. |
    | `RPORT_AUTH` | RPort authentication string. |
    | `RPORT_NAME` | Name of the RPort client. |
    | `RPORT_TAGES` | Comma-separated tags (e.g., `linux,iot`). |
    | `RPORT_ALLOW_ROOT` | Allow root login (true/false). |
    | `RPORT_DATA_DIR` | RPort data directory path. |
    | `RPORT_KEEP_ALIVE` | Keepalive interval. |
    | `RPORT_MAX_RETRY_INTERVAL`| Max retry interval for connection. |
    | `RPORT_WATCHDOG_INTEGRATION`| Enable watchdog (true/false). |
    | `RPORT_LOG_FILE` | Path to RPort log file. |
    | `RPORT_LOG_LEVEL` | Logging level (e.g., info, error). |
    | `RPORT_ENABLED_REMOTE` | Enable remote scripts (true/false). |
    | `RPORT_ENABLED_MONITOR` | Enable monitoring (true/false). |
    | `RPORT_PM_ENABLED` | Enable Process Manager (true/false). |

## 🛠️ Usage

Once your `.env` file is ready, run the script with `sudo`:

```bash
sudo node formatText.js
```

### What Happens Next?
The script will perform the following actions:

1.  **Backup**: It checks for existing files. If found, it moves them to a `blackUpEnv` folder in the respective directory (e.g., `/etc/blackUpEnv/`).
2.  **Write Settings**: It writes new configurations to the following paths:
    *   `/etc/hostname`
    *   `/etc/hosts`
    *   `/usr/env/device.env`
    *   `/usr/env/iotmonitor.env`
    *   `/home/ds/rport/rport.conf`
3.  **Confirmation**: You will see setup confirmation messages in the console.

## ⚠️ Important Note

*   This script **overwrites** the target files. While backups are created, always double-check your `.env` values before running.
*   After running the script, a reboot might be required for some system changes (like hostname) to take full effect.

<div align="center">
  <sub>Developed by KNP| Last Updated: Aug 2025</sub>
</div>
