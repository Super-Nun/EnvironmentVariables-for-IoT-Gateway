const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const base = '/';

// // Helper function
// function writeFile(filePath, content) {
//   const fullPath = path.join(base, filePath);
//   fs.mkdirSync(path.dirname(fullPath), { recursive: true });
//   fs.writeFileSync(fullPath, content);
//   console.log(`✅ Wrote ${filePath} successfully. `);
// }
// Helper function with auto-backup
// function writeFile(filePath, content) {
//   const fullPath = path.join(base, filePath);
//   fs.mkdirSync(path.dirname(fullPath), { recursive: true });

//   // ถ้ามีไฟล์เดิมอยู่ → ทำ backup
//   if (fs.existsSync(fullPath)) {
//     let i = 1;
//     let backupPath;
//     do {
//       backupPath = `${fullPath}.${i}`;
//       i++;
//     } while (fs.existsSync(backupPath));
//     fs.renameSync(fullPath, backupPath);
//     console.log(`🌀 Backup created: ${backupPath}`);
//   }

//   // เขียนไฟล์ใหม่
//   fs.writeFileSync(fullPath, content);
//   console.log(`✅ Wrote ${filePath} successfully.`);
// }
// Helper function with auto-backup to "black" folder
function writeFile(filePath, content) {
  const fullPath = path.join(base, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  // โฟลเดอร์สำหรับเก็บ backup
  const backupDir = path.join(path.dirname(fullPath), 'blackUpEnv');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // ถ้ามีไฟล์เดิมอยู่ → ทำ backup โดยย้ายไฟล์เข้า backupDir
  if (fs.existsSync(fullPath)) {
    let i = 1;
    let backupPath;
    const baseName = path.basename(fullPath); // ชื่อไฟล์เดิม
    do {
      backupPath = path.join(backupDir, `${baseName}.${i}`);
      i++;
    } while (fs.existsSync(backupPath));
    fs.renameSync(fullPath, backupPath);
    console.log(`🌀 Backup created: ${backupPath}`);
  }

  // เขียนไฟล์ใหม่
  fs.writeFileSync(fullPath, content);
  console.log(`✅ Wrote ${filePath} successfully.`);
}

// 1. /etc/hostname
writeFile('etc/hostname', `${process.env.HOSTNAME}`);

// 2. /etc/hosts
const hostsContent = `127.0.0.1       localhost
::1             localhost ip6-localhost ip6-loopback
ff02::1         ip6-allnodes
ff02::2         ip6-allrouters

127.0.1.1       ${process.env.HOSTNAME}
`;
writeFile('etc/hosts', hostsContent);

// 3. /usr/env/device.env
const deviceEnv = `EDGE_CLUSTER='${process.env.EDGE_CLUSTER}'
EDGE_ID='${process.env.EDGE_ID}'
EDGE_STATION='${process.env.EDGE_STATION}'
EDGE_NUMBER='${process.env.EDGE_NUMBER}'
CONFIG_DOWNLOAD_TOKEN='${process.env.CONFIG_DOWNLOAD_TOKEN}'
GIT_USER='${process.env.GIT_USER}'
GIT_PASS='${process.env.GIT_PASS}'
`;
writeFile('usr/env/device.env', deviceEnv);

// 4. /usr/env/iotmonitor.env
const iotmonitorEnv = ` DOTENVENC_PASS='${process.env.DOTENVENC_PASS}'
 DOCKER=${process.env.DOCKER}
`;
writeFile('usr/env/iotmonitor.env', iotmonitorEnv);

// 5. /home/ds/rport/rport.conf
const rportConf = `[client]
   server = "${process.env.RPORT_SERVER}"
   auth = "${process.env.RPORT_AUTH}"
   use_system_id = ${process.env.RPORT_USE_SYSTEM_ID}
   use_hostname = ${process.env.RPORT_USE_HOSTNAME}
   name = "${process.env.RPORT_NAME}"
   tags = ${process.env.RPORT_TAGES.split(',').map(tag => `${tag.trim()}`).join(',')}
   allow_root = ${process.env.RPORT_ALLOW_ROOT}
   data_dir = "${process.env.RPORT_DATA_DIR}"
[connection]
   keepalive = '${process.env.RPORT_KEEP_ALIVE}'
   max_retry_interval = '${process.env.RPORT_MAX_RETRY_INTERVAL}'
   watchdog_integration = ${process.env.RPORT_WATCHDOG_INTEGRATION}
[logging]
   log_file = "${process.env.RPORT_LOG_FILE}"
   log_level = "${process.env.RPORT_LOG_LEVEL}"
[remote-commands]
[remote-scripts]
   enabled = ${process.env.RPORT_ENABLED_REMOTE}
[monitoring]
   enabled = ${process.env.RPORT_ENABLED_MONITOR}
   pm_enabled = ${process.env.RPORT_PM_ENABLED}
[interpreter-aliases]
[file-reception]
`;
writeFile('/home/ds/rport/rport.conf', rportConf);
