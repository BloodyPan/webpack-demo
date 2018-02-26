import { cube } from './math.js';
import '../css/style.css';
import Print from './print.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('div');
  // Lodash, now imported by this script
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  return element;
}

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
	
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = Print.bind(null, 'Hello webpack!!');

    element.appendChild(btn);
    return element;
  }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
	document.body.appendChild(component);
});

if (module.hot) {
	module.hot.accept('./print.js', function() {
		console.log('Accepting the updated printMe module!');
		document.body.removeChild(element);
		element = component();
		document.body.appendChild(element);
	})
}
