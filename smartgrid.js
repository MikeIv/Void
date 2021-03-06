var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'less', /* less || scss || sass || styl */
  columns: 24, /* number of grid columns */
  offset: '10px', /* gutter width px || % */
  mobileFirst: true, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: '1420px', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    xxlg: {
      width: '1920px',
      fields: '30px'/* -> @media (max-width: 1100px) */
    },
    xmlg: {
      width: '1800px',
      fields: '30px'/* -> @media (max-width: 1100px) */
    },
    xlg: {
      width: '1410px',
      fields: '30px'/* -> @media (max-width: 1100px) */
    },
    lg: {
      width: '1100px', /* -> @media (max-width: 1100px) */
    },
    md: {
      width: '960px'
    },
    sm: {
      width: '780px',
      fields: '20px',
      offset: '10px'
    },
    xs: {
      width: '560px',
      fields: '10px',
      offset: '5px'
    },
    xxs: {
      width: '200px',
      fields: '0px',
      offset: '0px'
    }
    /*
    We can create any quantity of break points.

    some_name: {
        width: 'Npx',
        fields: 'N(px|%|rem)',
        offset: 'N(px|%|rem)'
    }
    */
  }
};

smartgrid('./src/less', settings);
