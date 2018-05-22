import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Styles => Web plugin
  'fontFace': {
    'fontFamily': ''open_sansbold'',
    'src': 'url('../fonts/OpenSans-Bold-webfont.woff') format('woff')',
    'fontWeight': 'normal',
    'fontStyle': 'normal'
  },
  'fontFace': {
    'fontFamily': ''open_sanslight'',
    'src': 'url('../fonts/OpenSans-Light-webfont.woff') format('woff')',
    'fontWeight': 'normal',
    'fontStyle': 'normal'
  },
  'fontFace': {
    'fontFamily': ''open_sanssemibold'',
    'src': 'url('../fonts/OpenSans-Semibold-webfont.woff') format('woff')',
    'fontWeight': 'normal',
    'fontStyle': 'normal'
  },
  'fontFace': {
    'fontFamily': ''open_sansregular'',
    'src': 'url('../fonts/OpenSans-Regular-webfont.eot?#iefix') format('embedded-opentype')',
    'fontWeight': 'normal',
    'fontStyle': 'normal'
  },
  'html': {
    'boxSizing': 'border-box'
  },
  '*': {
    'WebkitBoxSizing': 'border-box',
    'boxSizing': 'inherit',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'html': {
    'fontSize': [{ 'unit': '%V', 'value': 0.625 }]
  },
  'body': {
    'height': [{ 'unit': 'px', 'value': 505 }],
    'width': [{ 'unit': 'px', 'value': 330 }],
    'background': '#252B33',
    'fontFamily': ''open_sansregular', arial, helvetica, sans-serif',
    'fontWeight': '400',
    'fontSize': [{ 'unit': 'px', 'value': 15 }],
    'overflow': 'hidden !important',
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '!important' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '!important' }]
  },
  'h1': {
    'fontFamily': ''open_sansregular', arial, helvetica, sans-serif',
    'fontWeight': '400',
    'fontSize': [{ 'unit': 'rem', 'value': 1.6 }],
    'textAlign': 'center',
    'color': '#fff',
    'lineHeight': [{ 'unit': 'px', 'value': 1 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 3 }, { 'unit': 'px', 'value': 0 }],
    'display': 'block',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'closer': {
    'cursor': 'pointer',
    'position': 'absolute',
    'top': [{ 'unit': 'rem', 'value': 2.5 }],
    'right': [{ 'unit': 'rem', 'value': 2 }]
  },
  '#main': {
    'padding': [{ 'unit': 'rem', 'value': 2.5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 2.5 }, { 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': 'px', 'value': 505 }],
    'width': [{ 'unit': 'px', 'value': 330 }],
    'position': 'relative',
    'overflow': 'hidden'
  },
  '#main': {
    'opacity': '0',
    'WebkitTransform': 'translate3d(100%,0,0)',
    'transform': 'translate3d(100%,0,0)',
    'WebkitTransition': 'transform 300ms ease, opacity 200ms ease',
    'transition': 'transform 300ms ease, opacity 200ms ease'
  },
  '#mainshow': {
    'opacity': '1',
    'WebkitTransform': 'translate3d(0,0,0)',
    'transform': 'translate3d(0,0,0)'
  },
  '#main:not(sendArticle)': {
    'padding': [{ 'unit': 'rem', 'value': 2.5 }, { 'unit': 'rem', 'value': 2 }, { 'unit': 'rem', 'value': 2.5 }, { 'unit': 'rem', 'value': 2 }]
  },
  '#mainindex': {
    'padding': [{ 'unit': 'rem', 'value': 3.5 }, { 'unit': 'rem', 'value': 5 }, { 'unit': 'rem', 'value': 3.5 }, { 'unit': 'rem', 'value': 5 }]
  },
  '#maincongrat': {
    'background': 'url(../../images/bg-congrat.png) no-repeat 95px 190px / 165px 117px'
  },
  'logo': {
    'textAlign': 'center',
    'display': 'block',
    'marginBottom': [{ 'unit': 'rem', 'value': 5 }]
  },
  // input index.html
  'small': {
    'fontFamily': ''open_sanslight', arial, helvetica, sans-serif',
    'fontSize': [{ 'unit': 'rem', 'value': 1.2 }],
    'fontWeight': '400',
    'color': 'rgba(255,255,255,.5)',
    'lineHeight': [{ 'unit': 'px', 'value': 2.3 }]
  },
  'small a': {
    'color': 'rgba(255,255,255,.5)',
    'WebkitTransition': 'color .2s ease',
    'textDecoration': 'none'
  },
  'small a:hover': {
    'color': 'rgba(255,255,255,1)'
  },
  'small a:focus': {
    'color': 'rgba(255,255,255,1)'
  },
  'input_t': {
    'marginBottom': [{ 'unit': 'rem', 'value': 2.5 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'input_l': {
    'marginBottom': [{ 'unit': 'rem', 'value': 2.5 }],
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'input_t label': {
    'fontSize': [{ 'unit': 'rem', 'value': 1 }],
    'color': '#fff',
    'textTransform': 'uppercase',
    'lineHeight': [{ 'unit': 'px', 'value': 1 }],
    'marginBottom': [{ 'unit': 'rem', 'value': 1 }],
    'display': 'block'
  },
  'input_l input': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 3.5 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 3.5 }],
    'background': 'rgba(255,255,255,.1)',
    'color': '#fff',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'borderRadius': '4px',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 1.5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 1.5 }],
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'transition': 'all .2s ease'
  },
  'input_t input': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 3.5 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 3.5 }],
    'background': 'rgba(255,255,255,.1)',
    'color': '#fff',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'borderRadius': '4px',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 1.5 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 1.5 }],
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'transition': 'all .2s ease'
  },
  'input_l inputerror': {
    'background': 'rgba(217,38,78,.1)',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#D9264E' }]
  },
  'textarea textareaerror': {
    'background': 'rgba(217,38,78,.1)',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#D9264E' }]
  },
  'input_t inputerror': {
    'background': 'rgba(217,38,78,.1)',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#D9264E' }]
  },
  '#ChampsAjouterror': {
    'background': 'rgba(217,38,78,.1)',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#D9264E' }]
  },
  'input_t input:focus': {
    'outline': 'none'
  },
  'input_t input::-webkit-input-placeholder': {
    'color': 'rgba(255,255,255,.4)'
  },
  'btn': {
    'display': 'block',
    'textAlign': 'center',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'marginTop': [{ 'unit': 'rem', 'value': 1 }]
  },
  'btnClose': {
    'display': 'block',
    'textAlign': 'center',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'marginTop': [{ 'unit': 'rem', 'value': 1 }]
  },
  '#mainindex btn': {
    'marginTop': [{ 'unit': 'rem', 'value': 3.5 }]
  },
  'btn button': {
    'display': 'inline-block',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'color': '#fff',
    'background': 'rgba(29,130,241,1)',
    'textAlign': 'center',
    'lineHeight': [{ 'unit': 'rem', 'value': 3.5 }],
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'borderRadius': '100px',
    'width': [{ 'unit': 'px', 'value': 150 }],
    'WebkitTransition': 'background .2s ease',
    'transition': 'background .2s ease',
    'cursor': 'pointer'
  },
  'btn button:hover': {
    'background': '#1DA8F1',
    'outline': 'none'
  },
  'btn button:focus': {
    'background': '#1DA8F1',
    'outline': 'none'
  },
  'btnClose button': {
    'display': 'inline-block',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'color': '#fff',
    'background': 'rgba(29,130,241,1)',
    'textAlign': 'center',
    'lineHeight': [{ 'unit': 'rem', 'value': 3.5 }],
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'borderRadius': '100px',
    'width': [{ 'unit': 'px', 'value': 150 }],
    'WebkitTransition': 'background .2s ease',
    'transition': 'background .2s ease',
    'cursor': 'pointer'
  },
  'btnClose button:hover': {
    'background': '#1DA8F1',
    'outline': 'none'
  },
  'btnClose button:focus': {
    'background': '#1DA8F1',
    'outline': 'none'
  },
  '#textarea1': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'display': 'block',
    'marginBottom': [{ 'unit': 'rem', 'value': 2 }],
    'transition': 'all .2s ease .1s'
  },
  '#textarea2': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'display': 'block',
    'marginBottom': [{ 'unit': 'rem', 'value': 2 }],
    'transition': 'all .2s ease .1s'
  },
  '#textarea1 label': {
    'color': '#fff',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'display': 'block',
    'marginBottom': [{ 'unit': 'rem', 'value': 1 }],
    'textAlign': 'left',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  '#textarea2 label': {
    'color': '#fff',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'display': 'block',
    'marginBottom': [{ 'unit': 'rem', 'value': 1 }],
    'textAlign': 'left',
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  '#textarea1 textarea': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 10 }],
    'overflow': 'auto',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'borderRadius': '2px',
    'background': 'rgba(255,255,255, .1)',
    'color': '#252B33',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'WebkitTransition': 'background .2s ease',
    'transition': 'background .2s ease',
    'resize': 'none',
    'padding': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }]
  },
  '#textarea2 textarea': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'rem', 'value': 10 }],
    'overflow': 'auto',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'borderRadius': '2px',
    'background': 'rgba(255,255,255, .1)',
    'color': '#252B33',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'WebkitTransition': 'background .2s ease',
    'transition': 'background .2s ease',
    'resize': 'none',
    'padding': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }]
  },
  '#textarea1 textarea:focus': {
    'outline': 'none',
    'background': 'rgba(255,255,255, 1)'
  },
  '#textarea2 textarea:focus': {
    'outline': 'none',
    'background': 'rgba(255,255,255, 1)'
  },
  '#textarea1 textareaonfocus': {
    'outline': 'none',
    'background': 'rgba(255,255,255, 1)'
  },
  '#textarea2 textareaonfocus': {
    'outline': 'none',
    'background': 'rgba(255,255,255, 1)'
  },
  '#textarea1blur': {
    'background': '#fff',
    'filter': 'blur(20px)'
  },
  '#textarea2blur': {
    'background': '#fff',
    'filter': 'blur(20px)'
  },
  '#textarea1 textarea::-webkit-input-placeholder': {
    'color': 'rgba(255,255,255,.4)'
  },
  '#textarea2 textarea::-webkit-input-placeholder': {
    'color': 'rgba(255,255,255,.4)'
  },
  'input_l input': {
    'background': 'url(../../images/icon-link.svg) no-repeat 14px 50%',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'rgba(29,130,241,.4)' }],
    'color': 'rgba(255,255,255,.4)',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'lineHeight': [{ 'unit': 'rem', 'value': 3.5 }],
    'paddingLeft': [{ 'unit': 'rem', 'value': 4 }],
    'WebkitTransition': 'border .2s ease'
  },
  'input_l input:focus': {
    'outline': 'none',
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'rgba(29,130,241,1)' }]
  },
  'champs': {
    'display': 'flex',
    'justifyContent': 'center',
    'flexDirection': 'column',
    'alignItems': 'center'
  },
  '#close': {
    'marginTop': [{ 'unit': '%V', 'value': 0.07 }],
    'width': [{ 'unit': 'px', 'value': 115 }],
    'height': [{ 'unit': 'px', 'value': 40 }],
    'borderRadius': '25px',
    'fontWeight': 'bold',
    'backgroundColor': 'white',
    'border': [{ 'unit': 'string', 'value': 'solid' }, { 'unit': 'px', 'value': 0.5 }, { 'unit': 'string', 'value': '#1c85ff' }],
    'WebkitTextFillColor': '#1c85ff'
  },
  '#errorPop': {
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'rem', 'value': 2.5 }, { 'unit': 'rem', 'value': 2 }, { 'unit': 'rem', 'value': 2.5 }, { 'unit': 'rem', 'value': 2 }],
    'height': [{ 'unit': 'px', 'value': 505 }],
    'width': [{ 'unit': 'px', 'value': 330 }],
    'display': 'flex',
    'justifyContent': 'center',
    'flexDirection': 'column',
    'alignItems': 'left',
    'background': 'rgba(37,43,51,.9)',
    'WebkitTransform': 'translateY(100%)',
    'transform': 'translateY(100%)',
    'transition': 'transform .5s cubic-bezier(.31,.8,.18,1.01)'
  },
  'sendArticle #errorPop': {
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }],
    'textAlign': 'center',
    'fontSize': [{ 'unit': 'rem', 'value': 1.2 }],
    'fontWeight': '300',
    'color': '#fff',
    'background': '#FF6767',
    'height': [{ 'unit': 'string', 'value': 'auto' }],
    'WebkitTransform': 'translateY(-100%)',
    'transform': 'translateY(-100%)',
    'transition': 'transform .5s cubic-bezier(.31,.8,.18,1.01)'
  },
  'sendArticle #errorPop p': {
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  '#errorPopshow': {
    'WebkitTransform': 'translateY(0)',
    'transform': 'translateY(0)',
    'transition': 'transform .1s cubic-bezier(.31,.8,.18,1.01)'
  },
  '#errorPopshowhide': {
    'WebkitTransform': 'translateY(0)',
    'transform': 'translateY(0)',
    'transition': 'transform .1s cubic-bezier(.31,.8,.18,1.01)'
  },
  '#errorPophide': {
    'WebkitTransform': 'translateY(100%)',
    'transform': 'translateY(100%)',
    'transition': 'transform .1s cubic-bezier(.31,.8,.18,1.01)'
  },
  '#errorPophideshow': {
    'WebkitTransform': 'translateY(100%)',
    'transform': 'translateY(100%)',
    'transition': 'transform .1s cubic-bezier(.31,.8,.18,1.01)'
  },
  '#errorPop h2': {
    'color': '#fff',
    'fontFamily': ''open_sanssemibold', arial, helvetica, sans-serif',
    'fontSize': [{ 'unit': 'rem', 'value': 2 }],
    'fontWeight': '400',
    'display': 'block',
    'width': [{ 'unit': '%H', 'value': 1 }],
    'textAlign': 'center',
    'lineHeight': [{ 'unit': 'px', 'value': 1.5 }],
    'marginBottom': [{ 'unit': 'rem', 'value': 1 }]
  },
  '#errorPop h2 span': {
    'fontFamily': ''open_sansregular', arial, helvetica, sans-serif',
    'fontSize': [{ 'unit': 'rem', 'value': 1.6 }]
  },
  '#errorPop p': {
    'fontFamily': ''open_sansregular', arial, helvetica, sans-serif',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'lineHeight': [{ 'unit': 'px', 'value': 1.5 }],
    'color': 'rgba(255,255,255,.8)',
    'textAlign': 'center'
  },
  '#errorPop close': {
    'position': 'absolute',
    'top': [{ 'unit': 'rem', 'value': 2.5 }],
    'right': [{ 'unit': 'rem', 'value': 2 }]
  },
  '#errorPop close a': {
    'textDecoration': 'none',
    'display': 'block',
    'opacity': '1',
    'transition': 'opacity .2s ease'
  },
  '#errorPop close a:hover': {
    'outline': 'none',
    'opacity': '.7'
  },
  '#errorPop close a:focus': {
    'outline': 'none',
    'opacity': '.7'
  },
  '#errorPop logo': {
    'textAlign': 'center',
    'display': 'block',
    'paddingLeft': [{ 'unit': '%H', 'value': 0.37 }],
    'marginBottom': [{ 'unit': 'rem', 'value': 3 }],
    'marginTop': [{ 'unit': 'rem', 'value': 6 }]
  },
  '#errorPop btnClose': {
    'paddingTop': [{ 'unit': '%V', 'value': 0.3 }]
  },
  'goBack': {
    'position': 'absolute',
    'top': [{ 'unit': 'rem', 'value': 2.5 }],
    'left': [{ 'unit': 'rem', 'value': 2 }]
  },
  '#ChampsAjout': {
    'background': 'rgba(255,255,255,.1)',
    'height': [{ 'unit': 'rem', 'value': 4.5 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 4.5 }]
  },
  '#ChampsAjout input': {
    'display': 'inline-block',
    'verticalAlign': 'middle',
    'height': [{ 'unit': 'rem', 'value': 4.5 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 4.5 }],
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'background': 'none'
  },
  '#ChampsAjout button': {
    'display': 'inline-block',
    'verticalAlign': 'middle',
    'height': [{ 'unit': 'rem', 'value': 4.5 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 4.5 }],
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'background': 'none'
  },
  '#ChampsAjout input:focus': {
    'outline': 'none'
  },
  '#ChampsAjout button:focus': {
    'outline': 'none'
  },
  '#ChampsAjout input': {
    'width': [{ 'unit': '%H', 'value': 0.8 }],
    'paddingLeft': [{ 'unit': 'rem', 'value': 2 }],
    'color': '#fff',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }]
  },
  '#ChampsAjout button': {
    'width': [{ 'unit': '%H', 'value': 0.18 }],
    'float': 'right',
    'cursor': 'pointer'
  },
  'checkbox': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 2 }],
    'height': [{ 'unit': 'rem', 'value': 6.7 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 6.7 }],
    'display': '-webkit-flex',
    'display': 'flex',
    'WebkitAlignItems': 'center',
    'alignItems': 'center',
    'position': 'relative',
    'overflow': 'hidden',
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#3B4047' }]
  },
  'checkbox avatar': {
    'background': '#E7E8E9',
    'borderRadius': '100%',
    'width': [{ 'unit': 'rem', 'value': 4 }],
    'height': [{ 'unit': 'rem', 'value': 4 }],
    'lineHeight': [{ 'unit': 'rem', 'value': 4 }],
    'textAlign': 'center',
    'color': '#252B33',
    'fontFamily': ''open_sanssemibold', arial, helvetica, sans-serif',
    'fontSize': [{ 'unit': 'rem', 'value': 2 }],
    'textTransform': 'uppercase',
    'marginRight': [{ 'unit': 'rem', 'value': 2 }]
  },
  'checkbox label': {
    'color': '#E7E8E9',
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'fontWeight': '400',
    'wordBreak': 'break-all',
    'lineHeight': [{ 'unit': 'rem', 'value': 4 }],
    'width': [{ 'unit': '%H', 'value': 0.75 }],
    'cursor': 'pointer'
  },
  'checkbox label span': {
    'display': 'inline-block',
    'verticalAlign': 'middle',
    'lineHeight': [{ 'unit': 'px', 'value': 1.5 }]
  },
  'checkbox input:not(:checked)': {
    'position': 'absolute',
    'top': [{ 'unit': '%V', 'value': -1 }],
    'left': [{ 'unit': '%H', 'value': -1 }]
  },
  'checkbox input:checked': {
    'position': 'absolute',
    'top': [{ 'unit': '%V', 'value': -1 }],
    'left': [{ 'unit': '%H', 'value': -1 }]
  },
  'checkbox input:not(:checked) + label:after': {
    'content': '''',
    'width': [{ 'unit': 'rem', 'value': 2.5 }],
    'height': [{ 'unit': 'rem', 'value': 2.5 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#E7E8E9' }],
    'borderRadius': '100%',
    'position': 'absolute',
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'right': [{ 'unit': 'rem', 'value': 3 }],
    'marginTop': [{ 'unit': 'rem', 'value': -1.25 }],
    'display': 'block'
  },
  'checkbox input:checked + label:after': {
    'content': '''',
    'width': [{ 'unit': 'rem', 'value': 2.5 }],
    'height': [{ 'unit': 'rem', 'value': 2.5 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#E7E8E9' }],
    'borderRadius': '100%',
    'position': 'absolute',
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'right': [{ 'unit': 'rem', 'value': 3 }],
    'marginTop': [{ 'unit': 'rem', 'value': -1.25 }],
    'display': 'block'
  },
  'checkbox deleteThisOne': {
    'background': 'url(../../images/trash.svg) no-repeat 50% / 15px 15px',
    'color': '#E7E8E9',
    'fontSize': [{ 'unit': 'px', 'value': 18 }],
    'fontWeight': '300',
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'textDecoration': 'none',
    'width': [{ 'unit': 'px', 'value': 15 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'WebkitTransition': 'all .2s ease',
    'transition': 'all .2s ease',
    'cursor': 'pointer'
  },
  'checkbox deleteThisOne:hover': {
    'opacity': '.7'
  },
  'checkbox input:checked + label:after': {
    'borderColor': '#1D82F1',
    'background': '#1D82F1 url(../../images/icon-check.svg) no-repeat 50% / 12px 9px'
  },
  'sendArticle submit': {
    'position': 'absolute',
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'padding': [{ 'unit': 'rem', 'value': 2 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 2 }, { 'unit': 'px', 'value': 0 }],
    'background': '#252B33'
  },
  '#showC': {
    'clear': 'both',
    'height': [{ 'unit': 'px', 'value': 315 }],
    'overflow': 'hidden'
  },
  'copyright': {
    'color': '#fff',
    'display': 'block',
    'textAlign': 'center',
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'rem', 'value': 3 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'fontSize': [{ 'unit': 'rem', 'value': 1 }],
    'textTransform': 'uppercase'
  },
  'copyright a': {
    'color': '#fff',
    'textDecoration': 'none'
  },
  'congrat h1': {
    'marginTop': [{ 'unit': 'rem', 'value': 10 }]
  }
});
