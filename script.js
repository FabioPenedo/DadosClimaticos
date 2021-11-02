const qS = (el)=>document.querySelector(el);

function time(){
    let date = new Date()
    let hour = date.getHours();
    if(hour >= 6 && hour < 18){
        qS('.modal').style.backgroundColor = '#fefae070';
        qS('.modal').addEventListener('mouseover', ()=>{
            qS('.modal').style.backgroundColor = '#fefae086';
        });
        qS('.modal').addEventListener('mouseout', ()=>{
            qS('.modal').style.backgroundColor = '#fefae070';
        });
    }else if(hour >= 0){
        qS('body').style.backgroundImage = 'url(assets/imagem/b.jpg)';
        qS('.modal').style.backgroundColor = '#01031cb6';
        qS('.modal').addEventListener('mouseover', ()=>{
            qS('.modal').style.backgroundColor = '#01031ccb';
        });
        qS('.modal').addEventListener('mouseout', ()=>{
            qS('.modal').style.backgroundColor = '#01031cb6';
        });
        qS('.titulo').style.color = '#ffe8d6';
        qS('.resultado h2').style.color = '#ddbea9';
        qS('.lat').style.color = '#ffe8d6';
        qS('.long').style.color = '#ffe8d6';
        qS('.tempInfo').style.color = '#ddbea9';
        qS('.tempMin span').style.color = '#ffe8d6';
        qS('.tempAtual span').style.color = '#ffe8d6';
        qS('.tempMax span').style.color = '#ffe8d6';
        qS('.tempDesc').style.color = '#ffe8d6';
        qS('.vento h2').style.color = '#ffe8d6';
        qS('.ventoInfo').style.color = '#ffe8d6';
        qS('.ventoArea').style.borderColor = '#ffe8d6';
        qS('.ventoPonto').style.backgroundColor = '#ffe8d6';
        qS('.solInfo').style.color = '#ffe8d6';
        qS('.aviso').style.color = '#ffe8d6';
        qS('footer').style.color = '#ffe8d6';
        qS('footer a').style.color = '#ffe8d6'
        qS('footer a').addEventListener('mouseover', ()=>{
            qS('footer a').style.color = '#ddbea9';
        });
        qS('footer a').addEventListener('mouseout', ()=>{
            qS('footer a').style.color = '#ffe8d6';
        });
    }
}
time();

qS('.busca').addEventListener('submit', async (event)=>{{
    event.preventDefault();
    let input = qS('#searchInput').value
    if(input !== ''){
        showWarning('');
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=fec0cfc215c206dff7c421ec90c42a51&units=metric&lang=pt_br`;
        let resultado = await fetch(url);
        let json = await resultado.json()
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                lon: json.coord.lon,
                lat: json.coord.lat,
                tempAtual: json.main.temp,
                tempMin: json.main.temp_min,
                tempMax: json.main.temp_max,
                desc: json.weather[0].description,
                icon: json.weather[0].icon,
                sunrise: json.sys.sunrise,
                sunset: json.sys.sunset,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
            sunrise({
                sunrise: json.sys.sunrise
            })
            sunset({
                sunset: json.sys.sunset
            })
            time({
                dt: json.dt
            })
            showWarning('');
        }else {
            clearInfo();
            showWarning('Localização não encontrada.');
        }
    }else {
        clearInfo();
    }

}});

function showInfo(obj){
    qS('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    qS('.coor .lat').innerHTML = `<span>lat</span> ${obj.lat}`;
    qS('.coor .long').innerHTML = `<span>lon</span> ${obj.lon}`;
    qS('.tempMin span').innerHTML = `${obj.tempMin} <sup>ºC</sup>`;
    qS('.tempAtual span').innerHTML = `${obj.tempAtual} <sup>ºC</sup>`;
    qS('.tempMax span').innerHTML = `${obj.tempMax} <sup>ºC</sup>`;
    qS('.tempDesc span').innerHTML = `${obj.desc}`;
    qS('.tempDesc img').src = `http://openweathermap.org/img/wn/${obj.icon}@2x.png`;
    qS('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;
    qS('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;
    qS('.resultado').style.display = 'flex';
}

function showWarning(msg) {
    qS('.aviso').innerHTML = msg
}

function clearInfo(){
    showWarning('');
    qS('.resultado').style.display = 'none';
}

function sunrise(obj){
    let time = `${obj.sunrise}`;
    let date = new Date(time * 1000);
    let hour = date.getHours();
    let minute = '0' + date.getMinutes();
    let re = `${hour}h:${minute.substr(-2)}`
    qS('.nasSol span').innerHTML = re
}

function sunset(obj){
    let time = `${obj.sunset}`;
    let date = new Date(time * 1000);
    let hour = date.getHours();
    let minute = '0' + date.getMinutes();
    let re = `${hour}h:${minute.substr(-2)}`
    qS('.pSol span').innerHTML = re
}