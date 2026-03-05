import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LanguageProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>,
)
