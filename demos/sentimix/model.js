(() => {
  const canvas = document.getElementById('model-canvas');
  const context = canvas.getContext('2d');
  const status = document.getElementById('model-view');
  if (!context) {
    status.textContent = 'Usa el plano 2D';
    return;
  }

  const rooms = [
    { name: 'Recepción', x: 0, z: 9, w: 7, d: 3, color: '#725248' },
    { name: 'Vista', x: 0, z: 4.5, w: 6, d: 4.5, color: '#244c69' },
    { name: 'Oído', x: 0, z: 0, w: 6, d: 4.5, color: '#24253b' },
    { name: 'Olfato', x: 6, z: 0, w: 6, d: 3, color: '#3a4d40' },
    { name: 'Tacto', x: 6, z: 3, w: 6, d: 3, color: '#765730' },
    { name: 'Gusto', x: 6, z: 6, w: 6, d: 3, color: '#753742' },
    { name: 'Almacén', x: 7, z: 9, w: 5, d: 3, color: '#424455' },
  ];
  const furniture = [];
  const accents = ['#edbe9d', '#90d9ff', '#8989e5', '#cbd6a7', '#ffcf84', '#ff9e9a', '#aeacbf'];
  const timber = '#55453b';
  const figure = (room, x, z, w, d, height, color, y = 0) => {
    const area = rooms[room];
    furniture.push({ room, x: area.x + x, z: area.z + z, w, d, y, height, color });
  };
  const table = (room, x, z, w, d) => {
    for (const legX of [x + .17, x + w - .28]) {
      for (const legZ of [z + .12, z + d - .23]) figure(room, legX, legZ, .11, .11, .54, timber);
    }
    figure(room, x, z, w, d, .12, '#c59473', .54);
  };
  const bench = (room, x, z, w = 1.3) => {
    figure(room, x + .12, z + .09, .15, .35, .29, timber);
    figure(room, x + w - .27, z + .09, .15, .35, .29, timber);
    const upholstery = room === 1 ? '#527b91' : '#986b81';
    figure(room, x, z, w, .53, .17, upholstery, .29);
    figure(room, x, z + .42, w, .14, .40, upholstery, .46);
  };
  const vessel = (room, x, z, radius, height, color, y) => {
    const area = rooms[room];
    furniture.push({ room, x: area.x + x, z: area.z + z, radius, y, height, color });
  };

  table(0, 3.95, .53, 2.1, .7);
  figure(0, 4.65, .7, .48, .26, .31, '#302438', .66);
  bench(0, .55, .52, 2.2);
  figure(0, .45, 1.52, 2.6, 1.05, .025, '#bb8b79');

  figure(1, .7, .32, 4.6, .15, 1.75, '#1c1e37');
  figure(1, .88, .49, 4.24, .035, 1.03, '#dc92c2', .61);
  figure(1, 1.02, .53, 3.96, .025, .24, '#a567a6', .75);
  for (const z of [1.85, 2.91]) {
    bench(1, .76, z, 1.75);
    bench(1, 3.49, z, 1.75);
  }

  // Staggered baffles create a dark listening area without blocking the cutaway.
  figure(2, .36, .25, 5.28, .12, 1.83, '#232942');
  for (const [index, x] of [.72, 1.62, 2.66, 3.72, 4.71].entries()) {
    const z = .48 + [0, .25, .48, .25, 0][index];
    figure(2, x, z, .52, .21, 1.42 - Math.abs(2 - index) * .12, '#41436a');
    figure(2, x + .47, z + .21, .026, .025, 1.06, '#858ad3', .15);
  }
  for (const x of [.43, 5.13]) {
    figure(2, x, 1.45, .43, .46, 1.18, '#252330');
    for (const y of [.42, .76]) figure(2, x + .08, 1.91, .27, .027, .16, '#72738f', y);
  }
  bench(2, .86, 2.52, 1.84);
  bench(2, 3.35, 2.52, 1.84);
  for (const z of [1.1, 1.72, 2.34, 2.96, 3.58, 4.14]) {
    for (const x of [2.75, 3.23]) figure(2, x, z, .055, .18, .035, '#e3ac76');
  }

  // Recessed garden and warm light frame the sampling stations.
  figure(3, .49, .24, 5.02, .43, .38, '#564b37');
  figure(3, .58, .31, 4.84, .28, .07, '#648055', .38);
  for (const x of [.58, 1.38, 2.18, 2.98, 3.78, 4.58, 5.38]) {
    figure(3, x, .19, .045, .07, 1.42, '#b3966e', .28);
  }
  figure(3, .58, .19, 4.85, .075, .065, '#b3966e', 1.65);
  vessel(3, 3, .46, .072, .88, '#97775d', .42);
  for (const [x, y, radius] of [[2.68, 1.13, .23], [2.39, 1.07, .18], [2.96, 1.24, .25], [3.25, 1.15, .25], [3.53, 1.04, .19]]) {
    vessel(3, x, .47, radius, .14, '#d6a0ae', y);
  }
  table(3, 1.01, 1.11, 3.98, .98);
  for (const [index, color] of ['#f1bad2', '#e6c696', '#bdd599'].entries()) {
    const x = 1.72 + index * 1.28;
    vessel(3, x, 1.53, .34, .06, '#e7bc85', .66);
    vessel(3, x, 1.53, .235, .27, color, .72);
    vessel(3, x, 1.53, .17, .004, '#5c5143', .99);
    vessel(3, x, 1.53, .251, .065, '#f1ded4', .994);
    furniture.at(-1).lid = index;
    vessel(3, x, 1.53, .055, .06, '#f1ded4', 1.059);
    furniture.at(-1).lid = index;
  }
  table(4, 1.1, .87, 3.8, 1.1);
  figure(4, 1, .73, 4, .06, .07, '#f3c998', 1.06);
  figure(4, .89, .7, .11, .10, 1.16, '#55403b');
  figure(4, 5, .7, .11, .10, 1.16, '#55403b');
  figure(4, 1.38, 1.15, .72, .53, .14, '#97664a', .66);
  for (let i = 0; i < 4; i++) {
    figure(4, 2.55 + i * .12, 1.1, .11, .6, .06, i % 2 ? '#ecc994' : '#a95f77', .66);
  }
  vessel(4, 4.09, 1.39, .22, .18, '#b8cfe3', .66);
  vessel(4, 4.09, 1.39, .27, .075, '#d2e3e8', .84);

  table(5, 1.04, .78, 3.92, 1.15);
  figure(5, .97, .62, 4.1, .10, .09, '#75503e', 1.86);
  for (const x of [1.55, 3, 4.43]) {
    vessel(5, x, .77, .035, .23, '#695042', 1.62);
    vessel(5, x, .77, .17, .19, '#f6d5a3', 1.45);
  }
  for (const x of [1.4, 3.05]) {
    figure(5, x, .98, 1.14, .54, .05, '#322537', .66);
    for (let i = 0; i < 3; i++) {
      figure(5, x + .1 + i * .32, 1.12, .23, .24, .11, i % 2 ? '#f7d2ba' : '#e8938c', .71);
    }
    vessel(5, x + 1.29, 1.65, .13, .19, '#9cb899', .66);
    vessel(5, x + 1.29, 1.65, .09, .008, '#587942', .85);
    bench(5, x, 2.32, 1.1);
  }
  figure(6, .45, .4, 3.95, .55, 1.05, '#776b83');
  figure(6, 2.9, 1.23, 1.53, .95, .48, '#72594b');

  const defaultYaw = -.56;
  const defaultElevation = .74;
  let yaw = defaultYaw;
  let elevation = defaultElevation;
  let zoom = 1;
  let active = 0;
  let focus = null;
  let pointer = null;
  let openSample = null;
  let hitAreas = [];
  const projection = new Image();
  projection.addEventListener('load', draw);
  projection.src = 'sala-1.jpg';

  function draw() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    const area = focus === null ? null : rooms[focus];
    const cx = area ? area.x + area.w / 2 : 6;
    const cz = area ? area.z + area.d / 2 : 6;
    const scale = Math.min(width / (area ? 8.2 : 17.4), height / (area ? 6.8 : 13.5)) * zoom;
    const c = Math.cos(yaw);
    const s = Math.sin(yaw);
    const tilt = Math.sin(elevation);
    const lift = Math.cos(elevation);
    const project = (x, y, z) => {
      const u = x - cx;
      const v = z - cz;
      const depth = -u * s + v * c;
      return {
        x: width / 2 + scale * (u * c + v * s),
        y: height * .53 + scale * (depth * tilt - y * lift),
        depth: depth * lift + y * tilt,
      };
    };
    const polygon = (points) => {
      context.beginPath();
      for (const [index, point] of points.entries()) {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.closePath();
    };
    const visible = area ? [focus] : rooms.map((_, index) => index);
    const floor = (r, height = 0) => [
      project(r.x, height, r.z), project(r.x + r.w, height, r.z),
      project(r.x + r.w, height, r.z + r.d), project(r.x, height, r.z + r.d),
    ];
    const faces = [];
    function solid(bottom, top, color) {
      const add = (points, shade) => {
        faces.push({ points, shade, color, depth: points.reduce((sum, point) => sum + point.depth, 0) / points.length });
      };
      add(top, 0);
      for (let i = 0; i < top.length; i++) {
        const j = (i + 1) % top.length;
        const side = [bottom[i], bottom[j], top[j], top[i]];
        const cross = (side[1].x - side[0].x) * (side[2].y - side[0].y);
        if (cross > 0) add(side, .19 + .24 * Math.abs(Math.cos(i * Math.PI * 2 / top.length)));
      }
    }
    function box(x, z, w, d, y, h, color) {
      solid(floor({ x, z, w, d }, y), floor({ x, z, w, d }, y + h), color);
    }
    function line(a, b, color, weight) {
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.strokeStyle = color;
      context.lineWidth = weight;
      context.stroke();
    }
    hitAreas = [];
    for (const index of visible) {
      const r = rooms[index];
      const selected = index === active;
      const points = floor(r);
      hitAreas.push({ index, points });
      const edge = floor(r, -.24);
      for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        const side = [points[i], points[j], edge[j], edge[i]];
        if ((points[j].x - points[i].x) < 0) {
          polygon(side);
          context.fillStyle = '#201d28';
          context.fill();
        }
      }
      polygon(points);
      const light = project(r.x + r.w * .45, 0, r.z + r.d * (index === 3 ? .54 : .33));
      const finish = context.createRadialGradient(light.x, light.y, 0, light.x, light.y, scale * r.w * .8);
      finish.addColorStop(0, accents[index] + (index === 2 ? '58' : '9b'));
      finish.addColorStop(.6, r.color);
      finish.addColorStop(1, '#24212b');
      context.fillStyle = r.color;
      context.fill();
      context.fillStyle = finish;
      context.fill();
      for (let z = r.z + .20; z < r.z + r.d - .08; z += .22) {
        line(project(r.x + .12, .01, z), project(r.x + r.w - .12, .01, z), '#17142138', .75);
      }
      for (const item of furniture.filter((piece) => piece.room === index && piece.y === 0 && piece.w)) {
        polygon(floor({ ...item, x: item.x + .06, z: item.z + .09, w: item.w + .09, d: item.d + .08 }));
        context.fillStyle = '#15101965';
        context.fill();
      }
      polygon(points);
      context.strokeStyle = selected ? '#ffd0e5' : '#a38ba680';
      context.lineWidth = selected ? 2.6 : 1.2;
      context.stroke();

      // Half walls keep the equipment visible as the camera orbits.
      const wall = index === 2 ? '#39354a' : index === 3 ? '#777763' : selected ? '#c5a7a6' : '#746974';
      const back = area && Math.cos(yaw) > .45 ? 1.72 : .52;
      box(r.x + .06, r.z + .06, r.w - .12, .13, 0, back, wall);
      box(r.x + .07, r.z + .19, r.w - .14, .025, .08, .04, accents[index]);
      if (area && (index === 2 || index === 4)) {
        for (let x = r.x + .17; x < r.x + r.w - .16; x += .18) {
          box(x, r.z + .20, .055, .05, .12, back - .16, '#664838');
        }
      }
      box(r.x + .06, r.z + .06, .09, r.d - .2, 0, .38, wall);
      box(r.x + r.w - .15, r.z + .06, .09, r.d - .15, 0, .38, wall);
      box(r.x + .06, r.z + r.d - .15, r.w * .52, .09, 0, .35, wall);
    }
    for (const f of furniture) {
      if (!visible.includes(f.room)) continue;
      if (!f.radius) {
        box(f.x, f.z, f.w, f.d, f.y, f.height, f.color);
        continue;
      }
      const lifted = f.lid !== undefined && f.lid === openSample;
      const ring = (height) => Array.from({ length: 12 }, (_, i) => {
        const angle = i * Math.PI / 6;
        return project(f.x + Math.cos(angle) * f.radius, height + (lifted ? .16 : 0), f.z + Math.sin(angle) * f.radius + (lifted ? -.38 : 0));
      });
      solid(ring(f.y), ring(f.y + f.height), f.color);
    }
    if (visible.includes(1) && projection.naturalWidth && c > 0) {
      const origin = project(.91, 1.61, 5.04);
      const right = project(5.09, 1.61, 5.04);
      const bottom = project(.91, .67, 5.04);
      faces.push({
        depth: (right.depth + bottom.depth) / 2,
        paint() {
          context.save();
          context.transform(right.x - origin.x, right.y - origin.y, bottom.x - origin.x, bottom.y - origin.y, origin.x, origin.y);
          context.drawImage(projection, projection.width * .24, projection.height * .30, projection.width * .53, projection.height * .26, 0, 0, 1, 1);
          context.restore();
        },
      });
    }
    faces.sort((a, b) => a.depth - b.depth);
    for (const face of faces) {
      if (face.paint) {
        face.paint();
        continue;
      }
      polygon(face.points);
      context.fillStyle = face.color;
      context.fill();
      if (face.shade) {
        context.fillStyle = `rgba(22, 14, 30, ${face.shade})`;
        context.fill();
      }
      context.strokeStyle = '#2116228c';
      context.lineWidth = .7;
      context.stroke();
    }

    for (const index of visible) {
      const r = rooms[index];
      const point = project(r.x + r.w / 2, area ? 2.1 : .92, r.z + r.d / 2);
      const selected = index === active;
      context.font = `700 ${area || width > 580 ? 14 : 11}px system-ui`;
      const labelWidth = context.measureText(r.name).width + 18;
      context.fillStyle = selected ? '#ffd0e5' : '#21182bdc';
      context.beginPath();
      context.roundRect(point.x - labelWidth / 2, point.y - 12, labelWidth, 24, 8);
      context.fill();
      context.fillStyle = selected ? '#30182c' : '#fff2fa';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(r.name, point.x, point.y);
      const hit = hitAreas.find((item) => item.index === index);
      hit.label = { x: point.x, y: point.y, halfWidth: labelWidth / 2 };
    }
  }

  function select(index) {
    openSample = null;
    active = index;
    focus = index > 0 && index < 6 ? index : null;
    zoom = 1;
    status.textContent = focus === null ? 'Vista general' : rooms[index].name;
    draw();
  }

  window.sentimixModel = {
    select,
    liftSample(index) {
      openSample = index;
      draw();
    },
  };
  document.getElementById('model-left').addEventListener('click', () => { yaw -= .27; draw(); });
  document.getElementById('model-right').addEventListener('click', () => { yaw += .27; draw(); });
  document.getElementById('model-out').addEventListener('click', () => { zoom = Math.max(.65, zoom / 1.2); draw(); });
  document.getElementById('model-in').addEventListener('click', () => { zoom = Math.min(1.8, zoom * 1.2); draw(); });
  document.getElementById('model-reset').addEventListener('click', () => {
    yaw = defaultYaw;
    elevation = defaultElevation;
    focus = null;
    zoom = 1;
    status.textContent = 'Vista general';
    draw();
  });

  canvas.addEventListener('pointerdown', (event) => {
    if (pointer || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw, elevation, moved: false };
    canvas.setPointerCapture(pointer.id);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (!pointer.moved && Math.hypot(dx, dy) < 5) return;
    pointer.moved = true;
    yaw = pointer.yaw + dx * .01;
    elevation = Math.max(.32, Math.min(1.15, pointer.elevation + dy * .006));
    draw();
  });
  canvas.addEventListener('pointerup', (event) => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const { moved } = pointer;
    pointer = null;
    if (moved) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const selectable = hitAreas.filter(({ index }) => index < 6);
    const target = selectable.find(({ label }) => Math.abs(x - label.x) <= label.halfWidth && Math.abs(y - label.y) <= 12)
      || selectable.find(({ points }) => {
        context.save();
        context.resetTransform();
        polygon(points);
        const inside = context.isPointInPath(x, y);
        context.restore();
        return inside;
      });
    if (target) document.dispatchEvent(new CustomEvent('sentimix:select-room', { detail: target.index }));
  });
  canvas.addEventListener('lostpointercapture', () => { pointer = null; });
  new ResizeObserver(draw).observe(canvas);
})();
