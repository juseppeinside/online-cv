import plugin from 'tailwindcss/plugin';

module.exports = plugin(({ addComponents }) => {
  addComponents({
    '.h1': {
      'font-family': 'Roboto Flex',
      'font-weight': '800',
      'font-size': '60px',
      'letter-spacing': '0px',
      'line-height': '64px',
    },
    '.h2': {
      'font-family': 'Roboto Flex',
      'font-weight': '700',
      'font-size': '40px',
      'letter-spacing': '0px',
      'line-height': '48px',
    },
    '.h3': {
      'font-family': 'Roboto Flex',
      'font-weight': '500',
      'font-size': '30px',
      'letter-spacing': '0px',
      'line-height': '32px',
    },
    '.paragraph-sm': {
      'font-family': 'Roboto Flex',
      'font-weight': '400',
      'font-size': '18px',
      'line-height': '24px',
    },
  });
});
