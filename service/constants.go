// -*- Mode: Go; indent-tabs-mode: t -*-

/*
 * Copyright (C) 2017-2018 Canonical Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

package service

// Command-line parameter defaults and descriptions
const (
	defaultConfigFile      = ""
	defaultConfigFileUsage = "Path to the config file"
	defaultPortAdmin       = "4301"
	defaultPortAdminUsage  = "default server port e.g. '4301'"
	defaultPortUser        = "4300"
	defaultPortUserUsage   = "default server port e.g. '4300'"

	defaultTitle        = "SMB Admin"
	defaultLogo         = "/static/images/logo-ubuntu-orange.svg"
	defaultDocRootAdmin = "./static/build-admin"
	defaultDocRootUser  = "./static/build-enduser"
)

// Environment variables that will be checked
const (
	envTitle        = "SMBADMIN_TITLE"
	envLogo         = "SMBADMIN_LOGO"
	envDocRootAdmin = "SMBADMIN_DOCROOT_ADMIN"
	envDocRootUser  = "SMBADMIN_DOCROOT_USER"
	envPortAdmin    = "SMBADMIN_PORTADMIN"
	envPortUser     = "SMBADMIN_PORTUSER"
)

const version = "0.6"

// The type of interface that will be shown
const (
	InterfaceTypeAdmin = "admin"
	InterfaceTypeUser  = "user"
)

// snapInfos defines the key names and first service name of each of the snaps
var snapInfos = map[string]string{
	"nextcloud-nextant":  "nextcloud-nextant",
	"wekan-ondra":        "wekan-ondra",
	"rocketchat-server":  "rocketchat-server",
	"gogs":               "gogs",
	"spreed-webrtc-snap": "spreed-webrtc-snap",
	"mail-all-in-one":    "roundcube",
	"code":               "code",
}

// serviceInfos defines the basic information of service in each snap
var serviceInfos = map[string]ServiceInfo{
	"nextcloud-nextant":  {"nextcloud", "/index.php/settings/admin", "/index.php"},
	"wekan-ondra":        {"wekan", ":8080", ":8080"},
	"rocketchat-server":  {"node", ":3000", ":3000"},
	"gogs":               {"gogs", ":3001", ":3001"},
	"spreed-webrtc-snap": {"spreed", ":8084", ":8084"},
	"roundcube":          {"dovecot", ":8089", ":8089"},
	"iredadmin":          {"postfix", ":8090", ":8090"},
	"code":               {"code", ":80", ":80"},
}
