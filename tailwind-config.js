/* Marola — configuração do Tailwind CSS (CDN). Carregue DEPOIS de cdn.tailwindcss.com. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#EEF3F9', 100: '#D6E2F0', 200: '#AFC5DE', 300: '#7F9FC4', 400: '#4F78A5',
          500: '#2F5A87', 600: '#1E4569', 700: '#163757', 800: '#0E2A47', 900: '#0A2038', 950: '#061526',
        },
        sand: { 50: '#FBF9F4', 100: '#F6F1E7', 200: '#ECE3D0', 300: '#DDD0B3' },
        coral: { 300: '#FFA98A', 400: '#FF8A63', 500: '#FF6A3D', 600: '#D94A1C', 700: '#B53A12' },
        moss: { 500: '#2A9D74', 700: '#17684C' },
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
};
