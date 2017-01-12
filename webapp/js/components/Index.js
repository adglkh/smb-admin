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
var Navigation = require('./Navigation');
var Footer = require('./Footer');
var injectIntl = require('react-intl').injectIntl;

var Index = React.createClass({

  render: function() {
    var M = this.props.intl.formatMessage;
    return (
        <div className="inner-wrapper">
          <Navigation active="home" />

          <section className="row no-border">
            <h2>{TITLE}</h2>
            <div>
              <div className="box">
                {M({id: 'description'})}
              </div>
            </div>
          </section>

          <Footer />
        </div>
    );
  }
});

module.exports = injectIntl(Index);
