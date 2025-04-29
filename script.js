// const { Container } = require("@svgdotjs/svg.js")

const colors = {
    blue1: '#27548A',
    yellow: '#DDA853',
    coldWhite: '#f9f9f9'
}

class UserNameHelper {
    constructor(username) {
        this.userName = username
        this.userNameHtmlElement = document.getElementById('username-text')
    }

    insertValueInDom() {
        if (this.userNameHtmlElement && this.userName) this.userNameHtmlElement.textContent = `Welcome, ${this.userName}`
    }
}

class LevelHelper {
    constructor(level, xp) {
        this.container = SVG().addTo('#drawing-level').size('110', '110')
        this.level = level
        this.xp = xp
        this.xpHtmlElement = document.getElementById('xp-text')
    }



    drawingLevel() {
        let circle = this.container.circle(100).attr({
            fill: colors.coldWhite,
            'stroke-width': 10,
            stroke: colors.yellow,
            cx: 55,
            cy: 55
        })

        let text = this.container.text(`${this.level}`).fill(colors.yellow).font({
            size: 45,
            weight: 600
        })

        text.center(circle.cx(), circle.cy())
    }

    insertValueInDom() {
        if (this.xpHtmlElement) this.xpHtmlElement.textContent = `${this.xp}Kb`
    }

    createGraph() {
        if (this.level & this.xp) {
            this.drawingLevel()
            this.insertValueInDom()
        }
    }
}

class AuditHelper {
    constructor(done, received, bonus, ratio) {
        this.doneContainer = SVG().addTo('#audit-graph-done').size('100%', '10')
        this.receivedContainer = SVG().addTo('#audit-graph-received').size('100%', '10')
        this.BYTES_PER_PIXEL = 130 / (1024 * 1024)
        this.height = 10
        this.done = done
        this.received = received
        this.bonus = bonus
        this.ratio = ratio
        this.doneHtmlElement = document.getElementById('done-text')
        this.receivedHtmlElement = document.getElementById('received-text')
        this.ratioHtmlElement = document.getElementById('ratio-text')
    }

    drawingDoneRect() {
        this.doneContainer.rect(this.BYTES_PER_PIXEL * this.done, this.height).attr({
            fill: colors.yellow
        })
        if (this.bonus) {
            this.doneContainer.rect(this.BYTES_PER_PIXEL * this.bonus, this.height).attr({
                fill: colors.blue1,
                x: this.BYTES_PER_PIXEL * this.done
            })
        }
    }
    drawingReceivedRect() {
        this.receivedContainer.rect(this.BYTES_PER_PIXEL * this.received, this.height).attr({
            fill: colors.yellow
        })
    }
    insertValueInDom() {
        if (this.doneHtmlElement && this.receivedHtmlElement && this.ratioHtmlElement) {
            this.doneHtmlElement.textContent += `${this.done / (1024 * 1024)}Mb + ${this.bonus / (1024)}Kb`
            this.receivedHtmlElement.textContent += `${this.received / (1024 * 1024)}Kb`
            this.ratioHtmlElement.textContent = `Ratio:${this.ratio}`
        }

    }

    createGraph() {

        if (this.doneContainer && this.receivedContainer && this.done && this.received && this.ratio) {
            this.drawingDoneRect();
            this.drawingReceivedRect();
            this.insertValueInDom();
        }
    }
}

class ModuleHelper {
    constructor() {
        this.bgContainer = SVG().addTo('#module-graph')
        this.data = null
    }
}








// class LineGraph {
//     constructor(container, data) {
//         this.container = container;
//         this.data = data;
//         this.width = 500;
//         this.height = 300;
//         this.draw = SVG().addTo(container).size(this.width, this.height);
//     }

//     scaleX(date) {
//         const minDate = Math.min(...this.data.map(d => new Date(d.date).getTime()));
//         const maxDate = Math.max(...this.data.map(d => new Date(d.date).getTime()));
//         const dateMs = new Date(date).getTime();

//         return ((dateMs - minDate) / (maxDate - minDate)) * (this.width-3);
//     }

//     scaleY(xp) {
//         const maxXP = Math.max(...this.data.map(d => d.xp));

//         // Y axis goes from bottom (max xp) to top (0 xp)
//         return (this.height+3) - (xp / maxXP) * (this.height);
//     }

//     resize(width, height) {
//         if (width) this.width = width;
//         if (height) this.height = height;
//         this.render();
//     }

//     render() {
//         this.draw.clear();
//         this.draw.size(this.width, this.height);

//         const points = this.data.map(d => [this.scaleX(d.date), this.scaleY(d.xp)]);

//         let pathString = `M ${points[0][0]},${points[0][1]}`;
//         for (let i = 1; i < points.length; i++) {
//             const [prevX, prevY] = points[i - 1];
//             const [currX, currY] = points[i];
//             pathString += ` H ${currX} V ${currY}`;
//         }

//         this.draw.path(pathString).fill('none').stroke({ color: '#27548A', width: 2 });

//         points.forEach(([x, y]) => {
//             this.draw.circle(6).center(x, y).fill('#DDA853');
//         });
//     }

// }


class LineGraph {
    constructor(data) {
        this.data = data;
        this.width = 500;
        this.height = 300;

        const containerElement = document.getElementById('module-graph');
        if (containerElement) {
            containerElement.innerHTML = '';
            this.draw = SVG().addTo('#module-graph').size(this.width, this.height);
        } else {
            console.error("Container element not found");
        }
    }

    scaleX(date) {
        const minDate = Math.min(...this.data.map(d => new Date(d.date).getTime()));
        const maxDate = Math.max(...this.data.map(d => new Date(d.date).getTime()));
        const dateMs = new Date(date).getTime();

        // Apply margins
        return ((dateMs - minDate) / (maxDate - minDate)) * this.width;
    }

    scaleY(xp) {
        const maxXP = Math.max(...this.data.map(d => d.xp));

        // Apply margins
        return this.height - (xp / maxXP) * this.height;
    }

    resize(width, height) {
        if (width) this.width = width;
        if (height) this.height = height;

        this.draw.size(this.width, this.height);
        this.render();
    }

    render() {
        this.draw.clear();

        const points = this.data.map(d => [this.scaleX(d.date), this.scaleY(d.xp)]);

        // Create stepped path string
        let pathString = `M ${points[0][0]},${points[0][1]}`;
        for (let i = 1; i < points.length; i++) {
            const [currX, currY] = points[i];
            pathString += ` H ${currX} V ${currY}`;
        }

        // Draw the stepped line
        this.draw.path(pathString)
            .fill('none')
            .stroke({ color: '#27548A', width: 2 });

        // Draw data points
        points.forEach(([x, y], i) => {
            const dataPoint = this.draw.circle(8)
                .center(x, y)
                .fill('#DDA853');

            // Add hover interactions (without tooltips)
            dataPoint.on('mouseover', function () {
                this.animate(100).radius(6);
            });

            dataPoint.on('mouseout', function () {
                this.animate(100).radius(4);
            });
        });
    }
}

// Example usage:
// const xpData = [
//     { xp: 100, date: "2023-01-01" },
//     { xp: 200, date: "2023-02-01" },
//     { xp: 100, date: "2023-03-01" },
//     { xp: 150, date: "2023-04-01" },
// ];
// 
// const graph = new LineGraph('#module-graph', xpData);
// graph.render();




const xpData = [
    { xp: 10, date: "2023-01-01" },
    { xp: 100, date: "2023-02-01" },
    { xp: 200, date: "2023-02-12" },
    { xp: 100, date: "2023-03-01" },
    { xp: 150, date: "2023-04-01" },
    { xp: 250, date: "2025-02-05" }
];

const graph = new LineGraph(xpData);
graph.render();






const userNameHelper = new UserNameHelper('mohammed mihit');
const auditHelper = new AuditHelper(1.04 * 1024 * 1024, 1.14 * 1024 * 1024, 14 * 1024, '1.0');
const levelAndXpHelper = new LevelHelper();

// auditHelper.setValues()
// levelAndXpHelper.setValues(25, 597)

userNameHelper.insertValueInDom();
auditHelper.createGraph();
levelAndXpHelper.createGraph();
