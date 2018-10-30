const scenariosData = [
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Выключить весь свет в доме и во дворе'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_clock',
        panelTitle: 'Я ухожу'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Включить свет в корридоре'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_temp_on',
        panelTitle: 'Набрать горячую ванну',
        panelSub: 'Начнётся в 18:00'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Выключить весь свет в доме и во дворе'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_clock',
        panelTitle: 'Я ухожу'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Включить свет в корридоре'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_temp_on',
        panelTitle: 'Набрать горячую ванну',
        panelSub: 'Начнётся в 18:00'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Выключить весь свет в доме и во дворе'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Включить свет в корридоре'
    },
    {
        panelClasses: ['scenarios__panel'],
        iconClass: 'panel__icon_clock',
        panelTitle: 'Я ухожу'
    }
];

function getPanelsChunks (panelsData, chunkSize) {
    const panelChunks = [];
    for (let i = 0; i < panelsData.length; i = i + chunkSize) {
        panelChunks.push(panelsData.slice(i, i + chunkSize));
    }
    return panelChunks;
}

const scenarioTemplate = document.querySelector('template');
const scenariosBlock = document.querySelector('.scenarios');

const scenarioChunkSize = 9;
const scenarioChunks = getPanelsChunks(scenariosData, scenarioChunkSize);

const scenarioPages = [];
scenarioChunks.forEach(function () {
    const page = document.createElement('div');
    page.classList.add('scenarios__page');
    scenarioPages.push(page);
});

function addScenarios (scenarios, container) {
    scenarios.forEach(function (scenario) {
        const template = scenarioTemplate.content.cloneNode(true);
        const panelRoot = template.querySelector('.panel');
        scenario.panelClasses.forEach(panelClass => {
            panelRoot.classList.add(panelClass);
        });
        if (scenario.imageLink) {
            panelRoot.innerHTML = scenario.imageLink;
        } else {
            template.querySelector('.panel__icon').classList.add(scenario.iconClass);
            template.querySelector('.panel__title').innerHTML = scenario.panelTitle;
            const panelSub = template.querySelector('.panel__sub');
            if (scenario.panelSub) {
                panelSub.innerHTML = scenario.panelSub;
            } else {
                panelSub.parentNode.removeChild(panelSub);
            }
            if (scenario.modal) {
                panelRoot.addEventListener('click', () => {
                    showModal(`.${scenario.modal}`);
                });
            }
        }
        container.appendChild(template);
    });
}

addScenarios(scenarioChunks[0], scenarioPages[0]);
scenariosBlock.appendChild(scenarioPages[0]);

const devicesData = [
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_room', 'panel_floor'],
        modal: 'modal_knob',
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Xiaomi Warm Floor',
        panelSub: 'Включено'
    },
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_lamp'],
        modal: 'modal_light',
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Xiaomi Yeelight LED Smart Bulb',
        panelSub: 'Включено'
    },
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_cam'],
        iconClass: 'panel__icon_light_off',
        panelTitle: 'D-Link Omna 180 Cam',
        panelSub: 'Включится в 17:00'
    },
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_room', 'panel_temp'],
        modal: 'modal_temp',
        iconClass: 'panel__icon_temp_off',
        panelTitle: 'Elgato Eve Degree Connected',
        panelSub: 'Включится в 17:00'
    },
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_lamp'],
        modal: 'modal_light',
        iconClass: 'panel__icon_light_off',
        panelTitle: 'LIFX Mini Day & Dusk A60 E27',
        panelSub: 'Включится в 17:00'
    },
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_room'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Xiaomi Mi Air Purifier 2S',
        panelSub: 'Включено'
    },
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_lamp'],
        modal: 'modal_light',
        iconClass: 'panel__icon_light_off',
        panelTitle: 'Philips Zhirui',
        panelSub: 'Выключено'
    },
    {
        panelClasses: [ 'panel_device', 'devices__panel', 'panel_kitchen'],
        iconClass: 'panel__icon_light_on',
        panelTitle: 'Philips Purifier',
        panelSub: 'Включено'
    }
];

const devicesBlock = document.querySelector('.content__item_devices');
const devicesSection = document.createElement('section');
devicesSection.classList.add('devices');
addScenarios(devicesData, devicesSection);
devicesBlock.appendChild(devicesSection);

const output = document.querySelector('.modal__value');
const rangeSLider = document.querySelector('.adjust-bar.adjust-bar_theme_temp');

rangeSLider.oninput = function() {
    output.innerHTML = this.value > 0 ? '+' + this.value : this.value;
};

const arrowLeftDevs = document.querySelector('.devices__paginator .paginator__arrow_left');
const arrowRightDevs = document.querySelector('.devices__paginator .paginator__arrow_right');
const panelCountDevs = document.querySelectorAll('.devices__panel').length;
const devices = document.querySelector('.devices');
const paginatorDevs = document.querySelector('.devices__paginator');
let currentPageDevs = 1;

paginatorDevs.classList.toggle('paginator_hide', panelCountDevs < 7);

arrowRightDevs.addEventListener('click', () => {
    currentPageDevs += 1;
    arrowLeftDevs.classList.toggle('paginator__arrow_disabled', currentPageDevs === 1);
    devices.scroll({
        top: 0,
        left: 1366,
        behavior: 'smooth'
    });
});

arrowLeftDevs.addEventListener('click', () => {
    if (currentPageDevs > 1) {
        currentPageDevs -= 1;
        arrowLeftDevs.classList.toggle('paginator__arrow_disabled', currentPageDevs === 1);
        devices.scroll({
            top: 0,
            left: -1366,
            behavior: 'smooth'
        });
    }
});

let curValue;
let curRotate;
let maxRotate = 0.42; // 150 градусов
let minRotate = -0.42; // -150 градусов

const MIN_VALUE = 26;
const INDICATOR_OFFSET = 265;

const rotateToValue = (rotate) => {
    return Math.floor((Math.abs(rotate * 360 * 1.73 + INDICATOR_OFFSET) / 53) + MIN_VALUE);
};


/**
 * @param {Number} rotate Количество оборотов от нейтриального положения.
 */
function setRotate(rotate) {
    if (rotate > maxRotate) {
        rotate = maxRotate;
    } else if (rotate < minRotate) {
        rotate = minRotate;
    }

    curRotate = rotate;
    curValue = rotateToValue(rotate);

    document.querySelector('.modal_knob .modal__value').innerHTML = '+' + curValue;
    document.querySelector('.knob__value').innerHTML = '+' + curValue;
    document.querySelector('.knob__indicator').style.strokeDasharray = curRotate * 360 * 1.73 + INDICATOR_OFFSET + ' 629';
    document.querySelector('.knob__arrow').style.transform = 'rotate(' + (curRotate * 360) + 'deg)';
}

function getPosition(elem) {
    const rect = elem.getBoundingClientRect();

    return [
        rect.left + (rect.right - rect.left) / 2,
        rect.top + (rect.bottom - rect.top) / 2
    ];
}

function getMouseAngle(event, centerElem) {
    const pos = getPosition(centerElem);
    let cursor = [event.clientX, event.clientY];
    let rad;

    if (event.targetTouches && event.targetTouches[0]) {
        cursor = [event.targetTouches[0].clientX, event.targetTouches[0].clientY];
    }

    rad = Math.atan2(cursor[1] - pos[1], cursor[0] - pos[0]);
    rad += Math.PI / 2;

    return rad;
}

let knobDragged;
let prevAngleRad = null;
let prevRotate = null;

function startDragging(e) {
    e.preventDefault();
    e.stopPropagation();
    const rad = getMouseAngle(e, document.querySelector('.knob_center'));

    knobDragged = true;
    prevAngleRad = rad;
    prevRotate = curRotate;
}

function stopDragging(e) {
    knobDragged = false;
}

function dragRotate(e) {
    if (!knobDragged) {
        return;
    }

    const old = prevAngleRad;
    let rad = getMouseAngle(e, document.querySelector('.knob_center'));
    let delta = rad - old;

    prevAngleRad = rad;

    if (delta < 0) {
        delta += Math.PI * 2;
    }
    if (delta > Math.PI) {
        delta -= Math.PI * 2;
    }

    const deltaRotate = delta / Math.PI / 2;
    const rotate = prevRotate + deltaRotate;

    prevRotate = rotate;
    setRotate(rotate);
}

function setEvtListeners() {
    const elem = document.querySelector('.knob-container');

    elem.addEventListener('mousedown', startDragging);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('mousemove', dragRotate);
    elem.addEventListener('touchstart', startDragging);
    document.addEventListener('touchend', stopDragging);
    document.addEventListener('touchmove', dragRotate);
}

setEvtListeners();
setRotate(0);

document.querySelectorAll('.modal_close').forEach(b => {
    b.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => {
            m.classList.toggle('modal_open', false);
            document.querySelector('body').style.overflow = 'auto';
        });
    });
});

const TEMPS = {
    'manual': -10,
    'cold': 0,
    'warm': 23,
    'hot': 30
};

document.querySelectorAll('.modal__filter-item_temp').forEach(l => {
    l.addEventListener('click', () => {
        document.querySelector('.adjust-bar_theme_temp').value = TEMPS[this.id];
        document.querySelector('.modal_temp .modal__value').innerHTML = TEMPS[this.id] > 0 ? '+' + TEMPS[this.id] : TEMPS[this.id];
    });
});

const showModal = function(selector) {
    document.querySelector(selector).classList.toggle('modal_open', true);
    document.querySelector('body').style.overflow = 'hidden';
};

const arrowLeftScens = document.querySelector('.scenarios__paginator .paginator__arrow_left');
const arrowRightScens = document.querySelector('.scenarios__paginator .paginator__arrow_right');
const pageCountScens = scenarioPages.length;
const scenarios = document.querySelector('.scenarios');
const paginatorScens = document.querySelector('.scenarios__paginator');
let currentPage = 1;

paginatorScens.classList.toggle('paginator_hide', pageCountScens < 2);

arrowRightScens.addEventListener('click', () => {
    if (currentPage < pageCountScens) {
        addScenarios(scenarioChunks[currentPage], scenarioPages[currentPage]);
        scenariosBlock.appendChild(scenarioPages[currentPage]);
        currentPage += 1;
        arrowRightScens.classList.toggle('paginator__arrow_disabled', currentPage === pageCountScens);
        arrowLeftScens.classList.toggle('paginator__arrow_disabled', currentPage === 1);
        scenarios.scroll({
            top: 0,
            left: 645,
            behavior: 'smooth'
        });
    }
});

arrowLeftScens.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage -= 1;
        arrowRightScens.classList.toggle('paginator__arrow_disabled', currentPage === pageCountScens);
        arrowLeftScens.classList.toggle('paginator__arrow_disabled', currentPage === 1);
        scenarios.scroll({
            top: 0,
            left: -645,
            behavior: 'smooth'
        });
    }
});

const mainScenariosData = [
    {
        panelClasses: ['main__panel', 'panel_device', 'panel_first'],
        iconClass: 'panel__icon_temp_off',
        panelTitle: 'Philips Cooler',
        panelSub: 'Начнет охлаждать в 16:30'
    },
    {
        panelClasses: ['main__panel', 'panel_device'],
        iconClass: 'panel__icon_light_off',
        panelTitle: 'Xiaomi Yeelight LED Smart Bulb',
        panelSub: 'Включится в 17:00'
    },
    {
        panelClasses: ['main__panel', 'panel_device', 'panel_out_bot'],
        iconClass: 'panel__icon_light_off',
        panelTitle: 'Xiaomi Yeelight LED Smart Bulb',
        panelSub: 'Включится в 17:00'
    },
    {
        panelClasses: ['main__panel', 'panel_device', 'panel_out_bot'],
        imageLink: `<a target="_blank" href="http://ya.ru" rel="noopener">
                        <img src="assets/banner.webp" border="0">
                    </a>`
    }
];

const mainUpcoming = document.createElement('div');
mainUpcoming.classList.add('main__upcoming');
const mainContainer = document.querySelector('.main__upcoming-wrapper');
const displayedPanelsCount = 3;

const mainScenarioChunks = getPanelsChunks(mainScenariosData, displayedPanelsCount);
addScenarios(mainScenarioChunks[0], mainUpcoming);
mainContainer.appendChild(mainUpcoming);

let scrollTopOffset = 90;
let prevScrollTop = 0;
let mainScenarioPage = 1;
mainUpcoming.addEventListener('scroll', () => {
    if (mainUpcoming.scrollTop - prevScrollTop > scrollTopOffset && mainScenarioChunks.length > mainScenarioPage) {
        prevScrollTop = mainUpcoming.scrollTop;
        scrollTopOffset = 402;
        addScenarios(mainScenarioChunks[mainScenarioPage], mainUpcoming);
        mainScenarioPage++;
    }
});
