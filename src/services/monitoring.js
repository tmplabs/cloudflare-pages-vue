import { ApplicationInsights } from '@microsoft/applicationinsights-web'

// Create a singleton instance of ApplicationInsights
let appInsights = null
let monitoringConfig = {
  ENABLE_MONITORING: false,
  INSTRUMENTATION_KEY: '',
  DEV: false
}

// Initialize Application Insights
export const initializeMonitoring = (viteEnv = {}) => {
  monitoringConfig.ENABLE_MONITORING = viteEnv.VITE_ENABLE_MONITORING === 'true';
  monitoringConfig.INSTRUMENTATION_KEY = viteEnv.VITE_APPINSIGHTS_INSTRUMENTATIONKEY;
  monitoringConfig.DEV = viteEnv.DEV || false;

  // Skip initialization if monitoring is disabled
  if (!monitoringConfig.ENABLE_MONITORING) {
    console.log('Monitoring is disabled')
    return null
  }

  if (!monitoringConfig.INSTRUMENTATION_KEY) {
    console.warn('Application Insights instrumentation key is not set')
    return null
  }

  if (appInsights) {
    return appInsights
  }

  appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: monitoringConfig.INSTRUMENTATION_KEY,
      enableAutoRouteTracking: true, // Track page views automatically
      enableCorsCorrelation: true,
      enableRequestTracking: true,
      enableAjaxPerfTracking: true,
      enableUnhandledPromiseRejectionTracking: true,
      enableAjaxErrorStatusText: true,
      enableDebug: monitoringConfig.DEV, // Enable debug mode in development
      disableFetchTracking: false,
      enableAjaxPerfTracking: true,
      maxAjaxCallsPerView: 500,
      excludeRequestFromTracking: (url) => {
        // Exclude Auth0 requests from tracking
        return url.includes('auth0.com') || url.includes('auth0/oauth/token')
      }
    }
  })

  // Load the Application Insights instance
  appInsights.loadAppInsights()
  appInsights.trackPageView() // Track the initial page view

  return appInsights
}

// Get the Application Insights instance
export const getMonitoring = () => {
  if (!monitoringConfig.ENABLE_MONITORING) {
    return null
  }
  if (!appInsights) {
    return initializeMonitoring()
  }
  return appInsights
}

// Track custom events
export const trackEvent = (name, properties = {}) => {
  const monitoring = getMonitoring()
  if (monitoring) {
    monitoring.trackEvent({ name }, properties)
  }
}

// Track exceptions
export const trackException = (error, properties = {}) => {
  const monitoring = getMonitoring()
  if (monitoring) {
    monitoring.trackException({ error, properties })
  }
}

// Track metrics
export const trackMetric = (name, average, properties = {}) => {
  const monitoring = getMonitoring()
  if (monitoring) {
    monitoring.trackMetric({ name, average }, properties)
  }
}

// Track page views
export const trackPageView = (name = null, uri = null, properties = {}) => {
  const monitoring = getMonitoring()
  if (monitoring) {
    monitoring.trackPageView({ name, uri }, properties)
  }
}

// Track user actions
export const trackUserAction = (name, properties = {}) => {
  trackEvent(`UserAction_${name}`, properties)
}

// Track API calls
export const trackApiCall = (name, success, duration, properties = {}) => {
  const monitoring = getMonitoring()
  if (monitoring) {
    monitoring.trackMetric({ name: `ApiCall_${name}`, average: duration }, { 
      success, 
      ...properties 
    })
    if (!success) {
      monitoring.trackEvent({ name: `ApiCall_${name}_Failed` }, properties)
    }
  }
}

export default {
  initializeMonitoring,
  getMonitoring,
  trackEvent,
  trackException,
  trackMetric,
  trackPageView,
  trackUserAction,
  trackApiCall
} 