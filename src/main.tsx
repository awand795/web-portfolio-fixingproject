import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </HelmetProvider>,
)
