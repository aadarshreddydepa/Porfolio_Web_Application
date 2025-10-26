import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    const setupComplete = localStorage.getItem('setupComplete');
    
    if (savedData && setupComplete === 'true') {
      try {
        setPortfolioData(JSON.parse(savedData));
        setIsSetupComplete(true);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    }
  }, []);

  const updatePortfolioData = (data) => {
    console.log('Updating portfolio data:', data);
    const newData = { ...data };
    setPortfolioData(newData);
    localStorage.setItem('portfolioData', JSON.stringify(newData));
  };

  const completeSetup = () => {
    console.log('Completing setup');
    setIsSetupComplete(true);
    localStorage.setItem('setupComplete', 'true');
  };

  const resetPortfolio = () => {
    setPortfolioData(null);
    setIsSetupComplete(false);
    localStorage.removeItem('portfolioData');
    localStorage.removeItem('setupComplete');
    window.location.reload();
  };

  const value = {
    portfolioData,
    isSetupComplete,
    updatePortfolioData,
    completeSetup,
    resetPortfolio,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
