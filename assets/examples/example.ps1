# Env
$SSH_CONFIG = "ssh/config"

function isExist {
  param ($path)
  if (Test-Path -Path $path) { return 1 } else { return 0 }
}

function makeDir {
  param ($path)
  New-Item -ItemType Directory -Path $path
}

function copyItem {
  param ($src, $dst)
  Copy-Item -Path $src -Destination $dst -force
}

function makeConfigDir {
  if (-Not (isExist("${CONFIG_DIR}"))) { makeDir("${CONFIG_DIR}") }
  if (-Not (isExist("${CONFIG_DIR}/user"))) { makeDir("${CONFIG_DIR}/user/") }
  if (-Not (isExist("${CONFIG_DIR}/user/ohmyposh"))) { makeDir("${CONFIG_DIR}/user/ohmyposh/") }
  if (-Not (isExist("${CONFIG_DIR}/user/rclone"))) { makeDir("${CONFIG_DIR}/user/rclone/") }
  if (-Not (isExist("${CONFIG_DIR}/user/restic"))) { makeDir("${CONFIG_DIR}/user/restic/") }
}

function collocateDefaults {
  param($src, $dst)
  copyItem($SSH_CONFIG, $SSH_DIR)
  copyItem($GIT_IGNORE, "${home}/.gitignore")
}

makeConfigDir
collocateDefaults

if ($IsLinux) {
  copyItem($WSL_LNX_CONFIG, "/etc/wsl.conf")
  copyItem($POWERSHELL_PROFILE, "${CONFIG_DIR}/powershell/")
  copyItem($BASH_CONFIG, "${home}/.bashrc")
  copyItem($TMUX_CONFIG, "${CONFIG_DIR}/tmux/")
  copyItem($GIT_LNX_CONFIG, "${home}/.gitconfig")
}

elseif ($IsMacOS) {}

elseif ($IsWindows) {
  ./pacmans/winget/install.ps1
  ./gsudo/install.ps1
  ./terminals/powershell/install.ps1
  ./terminals/winterm/install.ps1
  ./ohmyposh/install.ps1
  ./rclone/install.ps1
  ./restic/install.ps1
  ./pacmans/scoop/install.ps1

  # App data
  copyItem($WINTERM_SETTINGS, "${APPDATA_DIR}/Local/Packages/Microsoft.wintermTerminal_8wekyb3d8bbwe/LocalState/")
  copyItem($POWERSHELL_PROFILE, "${DOCS_DIR}/PowerShell/")

  # Defaults
  copyItem($WSL_WIN_CONFIG, "${home}/.wslconfig")
  copyItem($GIT_WIN_CONFIG, "${home}/.gitconfig")

  # User
  copyItem($OHMYPOSH_CONFIG, "${CONFIG_DIR}/ohmyposh/")

  copyItem($RESTIC_EXCLUDES, "${CONFIG_DIR}/restic/")
  copyItem($RESTIC_BACKUP, "${CONFIG_DIR}/restic/")
}
