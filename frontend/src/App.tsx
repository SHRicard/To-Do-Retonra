import React, { useState, useMemo } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Layout from './layout';
import desktopDark from './assets/bg-desktop-dark.jpg';
import desktopLight from './assets/bg-desktop-light.jpg';
import { CCol, CImage, CRow } from '@coreui/react';
import { TodoCards } from './components';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <main style={{ flex: 1 }}>
            <CRow
              className=""
              style={{
                minHeight: '40vh',
                margin: 0,
              }}
            >
              <CCol
                md={12}
                style={{
                  height: '40vh',
                  padding: 0,
                  margin: 0,
                }}
              >
                <CImage
                  fluid
                  src={isDarkMode ? desktopDark : desktopLight}
                  className="p-0 m-0"
                  style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                  }}
                  alt="background"
                />
              </CCol>
              <CCol
                className="d-flex align-items-center justify-content-center"
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  width: '100%',
                  maxWidth: '400px',
                }}
              >
                <TodoCards toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
              </CCol>
            </CRow>
          </main>

          <footer
            style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            Drop and Drop to reader list
          </footer>
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
