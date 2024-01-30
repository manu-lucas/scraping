const { By, until } = require('selenium-webdriver');
const { writeFileSync } = require('fs');
const { table } = require('console');

 const getNameAndRut = async (driver) => {
    try {
        //Click en Datos personales y tributarios
        await driver.findElement(By.id('menu_datos_contribuyente')).click();
        //Cerrar div de "Actividad economica principal"
        const divActEco = await driver.findElement(By.id("myMainActeco"));
        await driver.executeScript("arguments[0].style.display = 'none';", divActEco);
        //Click en Representantes legales
        await driver.findElement(By.id('headingConsultas')).click();
        await driver.sleep(3000);
        //Obteniendo la informacion del dropdown y sumando a un array
        const dropdownElements = await driver.findElements(By.xpath('//*[@id="no-more-tables"]/table/tbody/tr'));
        const elementTexts = [];
        let currentGroup = [];
        for (const element of dropdownElements) {
            const text = await element.getText();
            if (text.trim() !== '') {
                const parts = text.split(/\s+/);  
                const nombre = parts.slice(0, -2).join(' ');  
                const rut = parts.slice(-2, -1).join(' ');  
                const fecha = parts.slice(-1).join(' ');  
                //elementTexts.push({ nombre, rut, fecha });
                const data = { nombre, rut, fecha };
                currentGroup.push(data);
            }
        }
        //Verificar si la info recopilada tiene mas de 1 dato lo agrega como array,
        //de lo contrario lo agrega como objeto
        if (currentGroup.length >= 2) {
            elementTexts.push(currentGroup);
        } else if (currentGroup.length === 1) {
            elementTexts.push(currentGroup[0]);
        }
        console.log('Datos del desplegable:');
        console.log(elementTexts);
        return elementTexts;
    } catch (error) {
        console.log(`error in getNameAndRut: ${error}`);
    }
};
//Funcion que obtiene la direccion
 const getAdress = async (driver) => {
    try {
        //Localizar el elemento 
        const info =  await driver.findElement(By.id('domiCntr'));
        //Obtener el texto del elemento
        const adress = await info.getText();
        const adressObj = {
            adress
        }
        return adressObj
    } catch (error) {
        console.log(`error in getAdress: ${error}`);
    }
};
//Funcion que obtiene el nombre del Titular de los datos
 const getOwnerOfData = async (driver) => {
    try {
        //Localizar el elemento 
        const infoOwner =  await driver.findElement(By.id('nameCntr'));
        //Obtener el texto del elemento
        const owner = await infoOwner.getText();
        const ownerObj = {
            owner
        }
        return ownerObj
    } catch (error) {
        console.log(`error in getOwnerOfData: ${error}`);
    }
};
//Funcion que obtiene los datos de la seccion actividades economicas
//Especificamente el contenido de "Glosa descriptiva de actividades economicas"
 const getEconomicActivities = async (driver) => {
    try {
        //Click en Datos personales y tributarios
        await driver.findElement(By.id('menu_datos_contribuyente')).click();
        //Cerrar div de "Actividad economica principal"
        const divActEco = await driver.findElement(By.id("myMainActeco"));
        await driver.executeScript("arguments[0].style.display = 'none';", divActEco);
        //Click en Actividades economicas
        await driver.findElement(By.id('headingP10')).click();

        await driver.sleep(3000);
        //Obteniendo la informacion del dropdown y sumando a un array
        const dropdownElements = await driver.findElements(By.xpath('//*[@id="divActEcos"]/table/thead/tr'));
        let elementObj = {};
        for (const element of dropdownElements) {
            const text = await element.getText();
            // Encuentra el índice de la palabra "económicas"
            const index = text.indexOf('económicas');
            // Si encontró la palabra, divide el texto en dos partes
            if (index !== -1) {
                const key = text.substring(0, index + 'económicas'.length).trim();
                const value = text.substring(index + 'económicas'.length).trim();
                const obj = { [key]: value };
                elementObj = obj
            } else {
                console.log('No se encontró la palabra "económicas" en el texto');
            }
        }
        console.log(elementObj);
        return elementObj;
    } catch (error) {
        console.log(`error in getEconomicActivities: ${error}`);
    }
};


//Funcion que navega hacia el formulario F29 Y toma screenshot del table
 const getFormularioF29 = async (driver) => {
    try {
        //Click en seccion Servicios Online
        await driver.findElement(By.xpath('//*[@id="main-menu"]/li[2]/a')).click();
        await driver.sleep(1000)
        //Click en seccion Impuestos mensuales
        await driver.findElement(By.id('linkpadre_1042')).click();
        //Click en consulta y seguimiento
        await driver.findElement(By.xpath('//*[@id="my-wrapper"]/div[2]/div/div/div[2]/p[7]/a')).click();
        //Click en consulta integral F29
        await driver.findElement(By.xpath('//*[@id="my-wrapper"]/div[2]/div/div/div[2]/p[2]/a[2]')).click();
        //Esta seccion demora en cargar asique hacemos dormir al navegador
        await driver.sleep(5000);
        //Click en table item +F29 cuando el elemento este presente
        const ispresent = await driver.wait(until.elementLocated(By.css("a[href='#29']")));
        if(ispresent){
            await driver.findElement(By.css("a[href='#29']")).click();
        } else {
            console.log("elemento no encontrado o selector incorrecto");
        }
        //Esperar ya que es una pestaña que tarda en cargarse
        await driver.sleep(1500)
        //Scroll a la pagina y take screenshot
        const table = await driver.findElement(By.xpath('//*[@id="frame-window"]/table/tbody/tr[2]/td/table/tbody/tr/td/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr[1]/td/table/tbody/tr[3]/td/table/tbody'));
        await driver.executeScript('arguments[0].scrollIntoView({ behavior: "auto", block: "center", inline: "center" });', table);
        const screenshot = await table.takeScreenshot();
        return {screenshot}
    } catch (error) {
        console.log(`error in getFormularioF29: ${error}`);
    }
};
//Funcion para obtener x en el table
 const getXvalue = async (driver) => {
    try {
        //Localizar el elemento 
        const tableBody =  await driver.findElement(By.xpath('//*[@id="frame-window"]/table/tbody/tr[2]/td/table/tbody/tr/td/div/table[2]/tbody/tr/td[2]/table/tbody/tr[1]/td/table/tbody/tr[1]/td/table/tbody/tr[3]/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody'));
        //Que contiene el elemento
        const text = tableBody.getText()
        console.log(JSON.stringify(text));
    } catch (error) {
        console.log(`error in getXvalue: ${error}`);
    }
};

const getFacturas = async(driver)=>{
    try{
         //Click en Datos personales y tributarios

         await driver.findElement(By.id('menu_home')).click();
         await driver.manage().setTimeouts({implicit: 1500});
         await driver.findElement(By.className("ic_box1")).click();
         console.log("aca estoy")
         await driver.sleep(1500)
         const originalWindow = await driver.getWindowHandle();

         await driver.findElement(By.partialLinkText('Registro de Compras y Ventas')).click();
         await driver.manage().setTimeouts({implicit: 1500});


         await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            1000
          );        //  await driver.manage().setTimeouts({implicit: 2500});
          const windows = await driver.getAllWindowHandles();
          windows.forEach(async handle => {
            if (handle !== originalWindow) {
              await driver.switchTo().window(handle);
            }
          });
        //   const nuevoTitulo = await driver.getTitle();
// console.log('Título de la nueva ventana:', nuevoTitulo);
        //   await driver.wait(until.titleIs("MISII"), 10000);
         await driver.findElement(By.partialLinkText('Ingresar al Registro')).click();
        //  await driver.manage().setTimeouts({implicit: 1500});

/*   ------------------------   */
    //  await driver.manage().setTimeouts({implicit: 2500});
    await driver.manage().setTimeouts({implicit: 1500});


    await driver.wait(
       async () => (await driver.getAllWindowHandles()).length === 2,
       1000
     );        //  await driver.manage().setTimeouts({implicit: 2500});
     const windows1 = await driver.getAllWindowHandles();
     windows1.forEach(async handle => {
       if (handle !== originalWindow) {
         await driver.switchTo().window(handle);
       }
     });

          await driver.findElement(By.id('periodoMes'))
            //   await select.selectByValue('06')
              await select.selectByVisibleText('Marzo')


/*  


<select  id="periodoMes" "><option value="">Mes</option><!-- ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="01" class="ng-binding ng-scope" style="">Enero</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="02" class="ng-binding ng-scope">Febrero</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="03" class="ng-binding ng-scope">Marzo</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="04" class="ng-binding ng-scope">Abril</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="05" class="ng-binding ng-scope">Mayo</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="06" class="ng-binding ng-scope">Junio</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="07" class="ng-binding ng-scope">Julio</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="08" class="ng-binding ng-scope">Agosto</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="09" class="ng-binding ng-scope">Septiembre</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="10" class="ng-binding ng-scope">Octubre</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="11" class="ng-binding ng-scope">Noviembre</option><!-- end ngRepeat: mes in meses --><option ng-repeat="mes in meses" value="12" class="ng-binding ng-scope">Diciembre</option><!-- end ngRepeat: mes in meses --></select>
*/

        //  await driver.findElement(By.partialLinkText('Ingresar al Registro')).click();
        // const name = await driver.findElement(By.className('title'))
        // const enlace = await driver.findElement(By.css('div#contenido a[href="https://www4.sii.cl/consdcvinternetui"]'));

        // Hacer clic en el enlace
        // await enlace.click();
        //  console.log(enlace)
        //  await driver.findElement(By.linkText('Registro de Compras y Ventas')).click();
        //  await driver.manage().setTimeouts({implicit: 1500});

{/* <button type="submit" class="btn btn-default btn-xs-block btn-block">Consultar</button> */}
    //     const selectElement = await driver.findElement(By.id('periodoMes'))
    //   const select = new Select(selectElement)
    //   await select.selectByVisibleText('Diciembre')

        await driver.sleep(9000)

    }catch(error){
        console.log(`error in getFacturas: ${error}`);

    }
}

module.exports = {getNameAndRut,getAdress,getEconomicActivities,getFormularioF29,getXvalue, getOwnerOfData,getFacturas};