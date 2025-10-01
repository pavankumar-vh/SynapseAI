// Emergency test component
console.log('🧪 TEST: TestApp.jsx loading');

function TestApp() {
  console.log('🧪 TEST: TestApp rendering');
  
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to bottom, #f0f9ff, white)',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#0284c7', fontSize: '48px' }}>
        ✅ TEST: React is Working!
      </h1>
      <p style={{ fontSize: '24px', marginTop: '20px' }}>
        If you can see this, React is loading correctly.
      </p>
      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#bae6fd',
        borderRadius: '10px'
      }}>
        <h2>Next Steps:</h2>
        <ol style={{ fontSize: '18px', lineHeight: '2' }}>
          <li>Check browser console (F12)</li>
          <li>Look for 🧪 TEST messages</li>
          <li>Send me the console output</li>
        </ol>
      </div>
      <button 
        onClick={() => {
          console.log('🧪 TEST: Button clicked!');
          alert('Button works! Check console.');
        }}
        style={{
          marginTop: '20px',
          padding: '15px 30px',
          fontSize: '18px',
          background: '#0284c7',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Test Button - Click Me!
      </button>
    </div>
  );
}

export default TestApp;

