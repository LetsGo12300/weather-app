function getIcon(descriptionID){
    let code;
    if (descriptionID >= 803){
        code = '04';
    } else if (descriptionID === 802){
        code = '03';
    } else if (descriptionID === 801){
        code = '02';
    } else if (descriptionID === 800){
        code = '01';
    } else if (descriptionID >= 701){
        code = '50';
    } else if (descriptionID >= 600){
        code = '13';
    } else if (descriptionID >= 520){
        code = '09';
    } else if (descriptionID === 511){
        code = '13';
    } else if (descriptionID >= 500){
        code = '10';
    } else if (descriptionID >= 300){
        code = '09';
    } else if (descriptionID >= 200){
        code = '11';
    } else code = '01' // default 
    
    return `http://openweathermap.org/img/wn/${code}d@2x.png`;
}

export default getIcon;