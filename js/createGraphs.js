const colors = {
    blue1: '#27548A',
    yellow: '#DDA853',
    coldWhite: '#f9f9f9'
}

export class UserNameHelper {
    constructor(username) {
        this.userName = username
        this.userNameHtmlElement = document.getElementById('username-text')
    }

    insertValueInDom() {
        if (this.userNameHtmlElement && this.userName) this.userNameHtmlElement.textContent = `Welcome, ${this.userName}`
    }
}

export class LevelHelper {
    constructor(level, xp) {
        this.level = level
        this.xp = xp
        this.xpHtmlElement = document.getElementById('xp-text')

        const levelContainerElement = document.getElementById('drawing-level')
        console.log(levelContainerElement)
        if (levelContainerElement) {
            levelContainerElement.innerHTML = ''
            this.draw = SVG().addTo(levelContainerElement).size(110, 110)
        }
    }

    drawingLevel() {
        let circle = this.draw.circle(100).attr({
            fill: colors.coldWhite,
            'stroke-width': 10,
            stroke: colors.yellow,
            cx: 55,
            cy: 55
        })

        let text = this.draw.text(`${this.level}`).fill(colors.yellow).font({
            size: 45,
            weight: 600
        })

        text.center(circle.cx(), circle.cy())
    }

    insertValueInDom() {
        console.log("xp xp xp:",this.xp)
        if (this.xpHtmlElement) this.xpHtmlElement.textContent = `${formatBytes(this.xp)}`
    }

    createGraph() {
        if (this.level & this.xp) {
            this.drawingLevel()
            this.insertValueInDom()
        }
    }
}

export class AuditHelper {
    constructor(done, received, bonus, ratio) {
        this.BYTES_PER_PIXEL = 130 / (1024 * 1024)
        this.height = 10
        this.done = done
        this.received = received
        this.bonus = bonus
        this.ratio = ratio
        this.doneHtmlElement = document.getElementById('done-text')
        this.receivedHtmlElement = document.getElementById('received-text')
        this.ratioHtmlElement = document.getElementById('ratio-text')

        const doneContainerElement = document.getElementById('audit-graph-done')
        const receivedContainerElement = document.getElementById('audit-graph-received')

        if (doneContainerElement && receivedContainerElement) {
            doneContainerElement.innerHTML = ''
            receivedContainerElement.innerHTML = ''

            this.doneDrawing = SVG().addTo(doneContainerElement).size('100%', 10)
            this.receivedDrawing = SVG().addTo(receivedContainerElement).size('100%', 10)
        }

    }

    doneDrawingRect() {
        this.doneDrawing.rect(this.BYTES_PER_PIXEL * this.done, this.height).attr({
            fill: colors.yellow
        })
        if (this.bonus) {
            this.doneDrawing.rect(this.BYTES_PER_PIXEL * this.bonus, this.height).attr({
                fill: colors.blue1,
                x: this.BYTES_PER_PIXEL * this.done
            })
        }
    }
    drawingReceivedRect() {
        this.receivedDrawing.rect(this.BYTES_PER_PIXEL * this.received, this.height).attr({
            fill: colors.yellow
        })
    }
    insertValueInDom() {
        if (this.doneHtmlElement && this.receivedHtmlElement && this.ratioHtmlElement) {
            this.doneHtmlElement.textContent += `${formatBytes(this.done)} + ${formatBytes(this.bonus)}`;
            this.receivedHtmlElement.textContent += `${formatBytes(this.received)}`;
            this.ratioHtmlElement.textContent = `Ratio:${this.ratio}`
        }

    }

    createGraph() {

        if (this.doneDrawing && this.receivedDrawing && this.done && this.received && this.ratio) {
            this.doneDrawingRect();
            this.drawingReceivedRect();
            this.insertValueInDom();
        }
    }
}

export class LineGraph {
    constructor(data) {
        this.container=document.getElementById('module-graph')
        this.data = data;
        this.height = 300;
        this.dotRadius = 4;  
        this.margin = this.dotRadius;
        
        if (this.container) {
            this.container.innerHTML = '';
            const moduleSection=document.getElementById('module-section')
            this.width = moduleSection.offsetWidth - 43.9;  
            this.draw = SVG().addTo(this.container).size(this.width, this.height);
        } else {
            console.error("Container element not found");
        }
    }

    scaleX(date) {
        const minDate = Math.min(...this.data.map(d => d.date.getTime()));
        const maxDate = Math.max(...this.data.map(d => d.date.getTime()));
        const dateMs = date.getTime();

        const plotWidth = this.width - 2 * this.margin;
        return this.margin + ((dateMs - minDate) / (maxDate - minDate)) * plotWidth;
    }

    scaleY(xp) {
        const maxXP = Math.max(...this.data.map(d => d.xp));

        const plotHeight = this.height - 2 * this.margin;
        return this.margin + plotHeight - (xp / maxXP) * plotHeight;
    }

    resize(width, height) {
        if (width) this.width = width;
        if (height) this.height = height;

        this.draw.size(this.width, this.height);
        this.render();
    }

    render() {
        this.draw.clear();
        const points = this.data.map(d => [this.scaleX(d.date), this.scaleY(d.xp),d]);
        // const data=this.data
        let pathString = `M ${points[0][0]},${points[0][1]}`;
        for (let i = 1; i < points.length; i++) {
            const [currX, currY] = points[i];
            pathString += ` H ${currX} V ${currY}`;
        }

        this.draw.path(pathString)
            .fill('none')
            .stroke({ color: '#27548A', width: 2 });

        points.forEach(([x, y,data]) => {
            const dataPoint = this.draw.circle(this.dotRadius * 2) 
                .center(x, y)
                .fill('#DDA853');
            

            dataPoint.on('mouseover', function () {
                dataPoint.radius(6);
                const infoDotsContainer=document.getElementById('dot-info-container')
                // console.log(data)
                // console.log(count)
                // console.log(data[count])
                infoDotsContainer.innerHTML=`
                <h3 style=color:var(--yellow)>${data.name}</h3>
                <h3 style=color:var(--yellow)>Current xp:${data.xp} Bytes</h3>
                `
            });

            dataPoint.on('mouseout', function () {
                dataPoint.radius(4);
                const infoDotsContainer=document.getElementById('dot-info-container')
                infoDotsContainer.innerHTML=""
            });
        });
    }
}

function formatBytes(bytes) {
    if (bytes === 0 || isNaN(bytes) || bytes < 0) return "0 bytes";
    
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    const threshold = 1000;
    
    let i = 0;
    while (bytes >= threshold && i < units.length - 1) {
      bytes /= threshold;
      i++;
    }
    
    let formattedValue;
    if (i === 0) {
      formattedValue = Math.round(bytes);
    } else {
      formattedValue = bytes.toFixed(2);
    }
    
    return `${formattedValue} ${units[i]}`;
  }




// const xpData = [
//     { xp: 10, date: "2023-01-01" },
//     { xp: 100, date: "2023-02-01" },
//     { xp: 200, date: "2023-02-12" },
//     { xp: 100, date: "2023-03-01" },
//     { xp: 150, date: "2023-04-01" },
//     { xp: 250, date: "2025-02-05" }
// ];



// export const graphs={
//     userName: userNameHelper,
//     audit: auditHelper,
//     levelAndXp:levelAndXpHelper
// }

// userNameHelper.insertValueInDom();
// auditHelper.createGraph();
// levelAndXpHelper.createGraph();
