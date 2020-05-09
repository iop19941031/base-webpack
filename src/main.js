// import _ from 'lodash';
import './style.css';
import Icon from './11.jpg'
import Icon4 from './4.png'
import Data from './data.xml'
import { printMe } from './print.js';
function component() {
    var element = document.createElement('div');


    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');


    // 将图像添加到我们现有的 div。
    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    var myIcon4 = new Image();
    myIcon4.src = Icon4;

    element.appendChild(myIcon4);

    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);
    console.log(Data);
    return element;
}

document.body.appendChild(component());