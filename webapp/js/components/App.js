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
'use strict'
var React = require('react');
var injectIntl = require('react-intl').injectIntl;

const LANGUAGES = {
	en: 'English'
}

var App = React.createClass({
	getInitialState: function() {
		return {language: window.AppState.getLocale()}
	},

	handleLanguageChange: function(e) {
		e.preventDefault();
		this.setState({language: e.target.value});
		window.AppState.setLocale(e.target.value);
		window.AppState.rerender();
	},

	renderLanguage: function(lang) {
		if (this.state.language === lang) {
			return (
				<button onClick={this.handleLanguageChange} value={lang} className="button--secondary">{LANGUAGES[lang]}</button>
			);
		} else {
			return (
				<button onClick={this.handleLanguageChange} value={lang}>{LANGUAGES[lang]}</button>
			);
		}
	},

  render: function() {
		var M = this.props.intl.formatMessage;

    return (
      <div>
				<header className="banner global" role="banner">
				  <nav role="navigation" className="nav-primary">
				    <span id="main-navigation-link"><a href="#navigation">Jump to site nav</a></span>
				    <div className="logo">
				      <a className="logo-ubuntu" href="/">
				        <img width="106" height="25" src={LOGO} alt="" />
				        <span>{TITLE}</span>
				      </a>
				    </div>
						<div>
							<form id="language-form" className="header-search">
									{this.renderLanguage('en')}
							</form>
						</div>
				  </nav>
				</header>


				<div className="wrapper">

					{this.props.children}
				</div>

      </div>
    )
  }
});

module.exports = injectIntl(App);
