console.log("Canvas Works.")
fetch('/api').then(res => res.json()).then(data => drawGraph(data));
fetch('/api').then(res => res.json()).then(data => drawGraph2(data));
fetch('/api').then(res => res.json()).then(data => drawGraph3(data));

const drawGraph = (data) => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 220;
    canvas.height = 250;

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"Yes my fellow humans"`, 45 , 40);

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"No"`, 45 , 100);

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"Nope"`, 45 , 160);
    
    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"im monkey"`, 45 , 220);

    context.fillStyle = 'red';
    context.fillRect(10, 10, data.q1['1.1'] * 10, 50);
    context.fillStyle = 'blue';
    context.fillRect(10, 70, data.q1['1.2'] * 10, 50);
    //canvas.textContent("No");
    context.fillStyle = 'purple';
    context.fillRect(10, 130, data.q1['1.3'] * 10, 50);
    //canvas.textContent("Nope");
    context.fillStyle = 'white';
    context.fillRect(10, 190, data.q1['1.4'] * 10, 50);
    //canvas.textContent("im monkey");
    // console.log();
    // console.log(data.q2);
};

const drawGraph2 = (data) => {
    const canvas = document.getElementById('canvas2');
    const context = canvas.getContext('2d');
    canvas.width = 220;
    canvas.height = 250;

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"3"`, 45 , 40);

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"4"`, 45 , 100);

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"22"`, 45 , 160);
    
    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"3.082323723i"`, 45 , 220);

    context.fillStyle = 'red';
    context.fillRect(10, 10, data.q2['2.1'] * 10, 50);
    context.fillStyle = 'blue';
    context.fillRect(10, 70, data.q2['2.2'] * 10, 50);
    //canvas.textContent("No");
    context.fillStyle = 'purple';
    context.fillRect(10, 130, data.q2['2.3'] * 10, 50);
    //canvas.textContent("Nope");
    context.fillStyle = 'white';
    context.fillRect(10, 190, data.q2['2.4'] * 10, 50);
    //canvas.textContent("im monkey");
    // console.log();
    // console.log(data.q2);
};

const drawGraph3 = (data) => {
    const canvas = document.getElementById('canvas3');
    const context = canvas.getContext('2d');
    canvas.width = 390;
    canvas.height = 250;

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"Yes, I play games only on epic games launcher"`, 50 , 40);

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"Yes, I play games only on the origin launcher"`, 50 , 100);

    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"Yes, I play games only on mobile"`, 50 , 160);
    
    context.fillStyle = '#000000';
    context.font = '15px Arial';
    context.fillText(`"No, I play games on Steam"`, 50 , 220);

    context.fillStyle = 'red';
    context.fillRect(10, 10, data.q3['3.1'] * 10, 50);
    context.fillStyle = 'blue';
    context.fillRect(10, 70, data.q3['3.2'] * 10, 50);
    //canvas.textContent("No");
    context.fillStyle = 'purple';
    context.fillRect(10, 130, data.q3['3.3'] * 10, 50);
    //canvas.textContent("Nope");
    context.fillStyle = 'white';
    context.fillRect(10, 190, data.q3['3.4'] * 10, 50);
    //canvas.textContent("im monkey");
    // console.log();
    // console.log(data.q2);
};

// q1: {1.1: 2, 1.2: 1, 1.3: 1, 1.4: 1, undefined: null}
// q2: {2.1: 1, 2.2: 1, 2.3: 1, 2.4: 2, undefined: null}
// q3: {3.1: 3, 3.2: 1, 3.3: 0, 3.4: 1, undefined: null}