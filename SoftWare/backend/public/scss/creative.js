import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'html': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'body': {
    'fontFamily': ''Merriweather', 'Helvetica Neue', Arial, sans-serif'
  },
  'hr': {
    'maxWidth': [{ 'unit': 'px', 'value': 50 }],
    'borderWidth': '3px',
    'borderColor': '#be3a1d'
  },
  'hrlight': {
    'borderColor': '#fff'
  },
  'a': {
    'color': '#be3a1d',
    'WebkitTransition': 'all 0.2s',
    'MozTransition': 'all 0.2s',
    'transition': 'all 0.2s'
  },
  'a:hover': {
    'color': '#be3a1d'
  },
  'h1': {
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  'h2': {
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  'h3': {
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  'h4': {
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  'h5': {
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  'h6': {
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  'bg-primary': {
    'backgroundColor': '#be3a1d !important'
  },
  'bg-dark': {
    'backgroundColor': '#212529 !important'
  },
  'text-faded': {
    'color': 'rgba(255, 255, 255, 0.7)'
  },
  'section': {
    'padding': [{ 'unit': 'rem', 'value': 8 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 8 }, { 'unit': 'px', 'value': 0 }]
  },
  'section-heading': {
    'marginTop': [{ 'unit': 'px', 'value': 0 }]
  },
  '::-moz-selection': {
    'color': '#fff',
    'background': '#212529',
    'textShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }]
  },
  '::selection': {
    'color': '#fff',
    'background': '#212529',
    'textShadow': [{ 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }, { 'unit': 'string', 'value': 'none' }]
  },
  'img::selection': {
    'color': '#fff',
    'background': 'transparent'
  },
  'img::-moz-selection': {
    'color': '#fff',
    'background': 'transparent'
  },
  '#mainNav': {
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'rgba(33, 37, 41, 0.1)' }],
    'backgroundColor': '#fff',
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif',
    'WebkitTransition': 'all 0.2s',
    'MozTransition': 'all 0.2s',
    'transition': 'all 0.2s',
    '>w992': {
      'borderColor': 'transparent',
      'backgroundColor': 'transparent'
    }
  },
  '#mainNav navbar-brand': {
    'fontWeight': '700',
    'textTransform': 'uppercase',
    'color': '#be3a1d',
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  '#mainNav navbar-brand:focus': {
    'color': '#be3a1d'
  },
  '#mainNav navbar-brand:hover': {
    'color': '#be3a1d'
  },
  '#mainNav navbar-nav > linav-item > anav-link': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.9 }],
    'fontWeight': '700',
    'textTransform': 'uppercase',
    'color': '#212529'
  },
  '#mainNav navbar-nav > linav-item > anav-link:focus': {
    'fontSize': [{ 'unit': 'rem', 'value': 0.9 }],
    'fontWeight': '700',
    'textTransform': 'uppercase',
    'color': '#212529'
  },
  '#mainNav navbar-nav > linav-item > anav-link:hover': {
    'color': '#be3a1d'
  },
  '#mainNav navbar-nav > linav-item > anav-link:focus:hover': {
    'color': '#be3a1d'
  },
  '#mainNav navbar-nav > linav-item > anav-linkactive': {
    'color': '#be3a1d !important',
    'backgroundColor': 'transparent'
  },
  '#mainNav navbar-nav > linav-item > anav-link:focusactive': {
    'color': '#be3a1d !important',
    'backgroundColor': 'transparent'
  },
  '#mainNav navbar-nav > linav-item > anav-linkactive:hover': {
    'backgroundColor': 'transparent'
  },
  '#mainNav navbar-nav > linav-item > anav-link:focusactive:hover': {
    'backgroundColor': 'transparent'
  },
  'headermasthead': {
    'paddingTop': [{ 'unit': 'rem', 'value': 10 }],
    'paddingBottom': [{ 'unit': 'rem', 'value': NaN }],
    'backgroundImage': 'url("../img/concert.jpg")',
    'backgroundPosition': 'center center',
    'WebkitBackgroundSize': 'cover',
    'MozBackgroundSize': 'cover',
    'OBackgroundSize': 'cover',
    'backgroundSize': 'cover',
    '>w992': {
      'height': [{ 'unit': 'vh', 'value': 100 }],
      'minHeight': [{ 'unit': 'px', 'value': 650 }],
      'paddingTop': [{ 'unit': 'px', 'value': 0 }],
      'paddingBottom': [{ 'unit': 'px', 'value': 0 }]
    }
  },
  'headermasthead hr': {
    'marginTop': [{ 'unit': 'px', 'value': 30 }],
    'marginBottom': [{ 'unit': 'px', 'value': 30 }]
  },
  'headermasthead h1': {
    'fontSize': [{ 'unit': 'rem', 'value': 2 }],
    '>w1200': {
      'fontSize': [{ 'unit': 'rem', 'value': 4 }]
    }
  },
  'headermasthead p': {
    'fontWeight': '300',
    '>w768': {
      'fontSize': [{ 'unit': 'rem', 'value': 1.15 }]
    }
  },
  'service-box': {
    'maxWidth': [{ 'unit': 'px', 'value': 400 }]
  },
  'text-primary': {
    'color': '#be3a1d !important'
  },
  'btn': {
    'fontWeight': '700',
    'textTransform': 'uppercase',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'borderRadius': '300px',
    'fontFamily': ''Open Sans', 'Helvetica Neue', Arial, sans-serif'
  },
  'btn-xl': {
    'padding': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 2 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 2 }]
  },
  'btn-primary': {
    'backgroundColor': '#be3a1d',
    'borderColor': '#be3a1d'
  },
  'btn-primary:hover': {
    'color': '#fff',
    'backgroundColor': '#ee4b28 !important'
  },
  'btn-primary:focus': {
    'color': '#fff',
    'backgroundColor': '#ee4b28 !important'
  },
  'btn-primary:active': {
    'color': '#fff',
    'backgroundColor': '#ee4b28 !important'
  },
  'btn-primary:active': {
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.2 }, { 'unit': 'string', 'value': 'rgba(240, 95, 64, 0.5)' }, { 'unit': 'string', 'value': 'rgba(240, 95, 64, 0.5)' }, { 'unit': 'string', 'value': '!important' }]
  },
  'btn-primary:focus': {
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.2 }, { 'unit': 'string', 'value': 'rgba(240, 95, 64, 0.5)' }, { 'unit': 'string', 'value': 'rgba(240, 95, 64, 0.5)' }, { 'unit': 'string', 'value': '!important' }]
  }
});
