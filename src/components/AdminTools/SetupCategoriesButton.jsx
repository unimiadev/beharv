import React, { useState } from 'react';
import { setupCategories } from '../../utils/setupCategories';


// Componente para configurar as categorias
const SetupCategoriesButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSetupCategories = async () => {
    try {
      setIsLoading(true);
      setMessage('Configurando categorias...');
      
      await setupCategories();
      
      setMessage('Categorias configuradas com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Erro ao configurar categorias: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <button 
        onClick={handleSetupCategories}
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Configurando...' : 'Configurar Categorias'}
      </button>
      {message && (
        <p style={{ 
          marginTop: '10px',
          color: message.includes('Erro') ? 'red' : 'green' 
        }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default SetupCategoriesButton; 