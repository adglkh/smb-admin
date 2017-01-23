import React, { Component } from 'react'
import './App.css'

import If from 'toolkit/If'
import Header from 'toolkit/Header/Header'
import Footer from 'toolkit/Footer/Footer'

//import createServices from './services-data'
import api from './models/api'

import HomePage from './HomePage'
import ServicePage from './ServicePage'

import createHistory from 'history/createBrowserHistory'

const publicUrl = process.env.PUBLIC_URL

// @todo: Replace this url with the real snapweb link on the device
const snapwebUrl = 'http://localhost:4200/'
const history = createHistory()
const sections = ['service']

const brandData = {
    name: 'KEYMILE',
    id: 'keymile',
    color: '#FF7301',
}

function serviceIdFromPath(path) {
  const parts = path.split('/').slice(1)
  return (parts[0] === 'service' && parts[1]) || ''
}

function openNewTab(url) {
  const win = window.open(url, '_blank');
        if (win) {
          //Browser has allowed it to be opened
          win.focus();
        }
}

function getTimeStamp() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  const yyyy = today.getFullYear();
  let hours = today.getHours()
  let mins = today.getMinutes()
  let secs = today.getSeconds()

  if(dd<10) dd='0'+dd
  if(mm<10) mm='0'+mm
  if(hours<10) hours='0'+hours
  if(mins<10) mins='0'+mins
  if(secs<10) secs='0'+secs

  return dd+'/'+mm+'/'+yyyy+' '+hours+':'+mins+':'+secs;
}

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      installedServices: [],
      version: '',
      location: history.location,
    }

    history.listen(this.handleNavigation.bind(this))

    this.onMenuItemClick = this.onMenuItemClick.bind(this)
    // this.onRequestStop = this.onRequestStop.bind(this)
    // this.onRequestStart = this.onRequestStart.bind(this)
    this.onRequestAdminPage = this.onRequestAdminPage.bind(this)

    this.getServices()
    this.getVersion()
  }

  getServices() {
    // Get the installed services using the API
    api.serviceStates().then(response => {
      var cards = response.data.states.map(srv => {
        return {
          id: srv.name,
          name: srv.name,
          description: srv.description,
          action: srv.state,
          image: srv.name,
          configure: srv.configure,
        }
      })

      this.setState({ installedServices: cards })
    });

  }

  getVersion() {
    api.version().then(response => {
      this.setState({ version: ' (' + response.data.version + ')' })
    })
  }

  getSectionFromPath(path) {
    return path === '/' ? 'home' : (
      sections.find(section => (
        path.startsWith(`/${section}`)
      )) || ''
    )
  }

  findServiceById(id) {
    return this.state.installedServices.find(service => (service.id === id))
  }

  handleNavigation(location) {
    this.setState({ location: location })
    window.scrollTo(0, 0)
  }

  onMenuItemClick(id) {
    if (id === 'snapweb') {
      openNewTab(snapwebUrl)
    } 
    if (id === 'home') history.push('/')
  }

  onOpenService(id) {
    history.push('/service/' + id)
  }

  onRequestStop(id) {
    const newServices = this.state.installedServices
    const index = this.state.installedServices.findIndex(service => (
                                                      service.id === id))
    if (newServices[index].action === 'Running') {
      newServices[index].action = 'Stopped'
      newServices[index].history.unshift('Stopped ' + getTimeStamp())
      this.setState({installedServices: newServices})
    }
  }
  onRequestStart(id) {
    const newServices = this.state.installedServices
    const index = this.state.installedServices.findIndex(service => (
                                                      service.id === id))
    if (newServices[index].action === 'Stopped') {
      newServices[index].action = 'Running'
      newServices[index].history.unshift('Started ' + getTimeStamp())
      this.setState({installedServices: newServices})
    }
  }

  onRequestAdminPage(id) {
    console.log(id)
    const service = this.findServiceById(id)
    if (service) openNewTab(this.getBaseUrl() + service.configure)
  }

  getBaseUrl () {
      return location.protocol + '//' + location.hostname;
  }

  handleConfigureClick () {
      var url =this.getBaseUrl() + this.state.serviceConfigure[this.props.params.name];
      console.log(this.state.serviceConfigure);
      console.log(url);
      window.open(url, '_blank');
  }

  render() {

    const {
      location,
      installedServices,
    } = this.state

    // Display loading page if we are waiting for the API call to return
    if (installedServices.length === 0) {
      return <div>Loading...</div>
    }

    const currentSection = this.getSectionFromPath(location.pathname)
    const cardImgRootUrl = `${publicUrl}/icons/cards/`

    return (
      <div className='App'>
        <Header
          menuitems={[
            { id: 'snapweb', name: 'Snapweb' },
          ]}
          currentSection={currentSection}
          onMenuItemClick={this.onMenuItemClick}
          name={brandData.name}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
          customColor={brandData.color}
        />

        <main className='App-content'>
          <If cond={currentSection === 'home'}>
            <HomePage
              cardImgRootUrl={cardImgRootUrl}
              services={installedServices}
              onOpenService={this.onOpenService}
            />
          </If>
          <If cond={currentSection === 'service'}>
            <ServicePage
              cardImgRootUrl={cardImgRootUrl}
              service={installedServices.find(service => (
                  service.id === serviceIdFromPath(location.pathname)
                ))}
              onRequestAdminPage={this.onRequestAdminPage}
            />
          </If>

        </main>

        <Footer 
          firstLine={this.state.version}
          logo={`${publicUrl}/brands/${brandData.id}/logo.png`}
        />
      </div>
    )
  }
}

export default App