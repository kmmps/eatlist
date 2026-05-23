// eatlist — Shared UI Components
const { useState, useEffect, useRef } = React;

// ── Tokens ────────────────────────────────────────────────────────
const CORAL = '#EB6558';
const DARK = '#05061 5';
const GREEN = '#71CC97';
const GRAY = '#8D9091';
const LGRAY = '#F4F4F4';

const getC = (dark) => ({
  bg: dark ? '#05061 5' : '#FFFFFF',
  surf: dark ? '#1C1B1F' : '#F4F4F4',
  card: dark ? '#252525' : '#FFFFFF',
  text: dark ? '#FFFFFF' : '#05061 5',
  textMed: dark ? '#D0D0D0' : '#3C3736',
  textSec: '#8D9091',
  border: dark ? '#2D2D2D' : '#EEEEEE',
  coral: CORAL, green: GREEN,
  inputBg: dark ? '#1C1B1F' : '#F4F4F4',
  pillBg: dark ? '#2D2D2D' : '#FFFFFF',
  shadow: dark ?
  '0 2px 8px rgba(0,0,0,0.5)' :
  '0 2px 4px rgba(0,0,0,0.06),0 4px 6px rgba(0,0,0,0.1)'
});

const ts = (size, weight = 400, color) => ({
  fontFamily: "'DM Sans', sans-serif",
  fontSize: size,
  fontWeight: weight,
  letterSpacing: '-0.05em',
  lineHeight: 1.2,
  ...(color ? { color } : {})
});

Object.assign(window, { getC, ts, CORAL, DARK, GREEN, GRAY, LGRAY });

// ── StatusBar ─────────────────────────────────────────────────────
const StatusBar = ({ dark }) => {
  const c = getC(dark);
  return (
    <div style={{ height: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 28px', flexShrink: 0 }}>
      <span style={{ ...ts(15, 600), color: c.text }}>9:41</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="12" viewBox="0 0 17 12">
          {[0, 1, 2, 3].map((i) =>
          <rect key={i} x={i * 4.25} y={9 - i * 2.5} width="3.5" height={3 + i * 2.5} rx="0.8" fill={c.text} opacity={0.4 + i * 0.2} />
          )}
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke={c.text} strokeWidth="1.4" strokeLinecap="round">
          <path d="M.5 4C3.8.7 12.2.7 15.5 4" /><path d="M3 7c2-2.3 8-2.3 10 0" />
          <circle cx="8" cy="10" r="1" fill={c.text} stroke="none" />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 24, height: 12, border: `1.5px solid ${c.text}60`, borderRadius: 3.5, padding: '1.5px 2px' }}>
            <div style={{ width: '82%', height: '100%', background: c.text, borderRadius: 2 }} />
          </div>
          <div style={{ width: 2, height: 6, background: `${c.text}50`, borderRadius: '0 1.5px 1.5px 0', marginLeft: 1 }} />
        </div>
      </div>
    </div>);

};

// ── Logo ──────────────────────────────────────────────────────────
const EatLogo = ({ color = CORAL, height = 28 }) =>
<svg xmlns="http://www.w3.org/2000/svg" width={105.445 * (height / 56)} height={height} viewBox="0 0 105.445 56.003" fill="none" style={{ color }}>
    <path d="M 29.061 25.931 L 29.061 24.535 C 29.061 22.314 28.265 20.319 26.673 18.548 C 25.081 16.747 23.129 15.847 20.816 15.847 L 19.96 15.847 C 19.539 15.907 19.254 15.937 19.104 15.937 C 17.001 15.937 15.004 17.137 13.111 19.538 C 11.249 21.939 10.318 24.505 10.318 27.236 L 10.318 27.822 C 10.318 28.782 10.889 29.262 12.03 29.262 C 12.48 29.352 12.721 29.397 12.751 29.397 L 13.787 29.442 L 14.057 29.442 L 14.373 29.397 L 23.069 28.902 L 24.691 28.722 C 27.604 28.722 29.061 27.792 29.061 25.931 Z M 10.318 37.861 C 10.318 41.282 11.609 44.148 14.193 46.459 C 16.776 48.77 20.05 49.926 24.015 49.926 C 25.607 49.926 27.049 49.701 28.34 49.251 C 29.662 48.77 31.089 48.2 32.62 47.54 C 34.182 46.88 35.159 46.549 35.549 46.549 C 36.751 46.549 37.351 47.195 37.351 48.485 C 37.351 50.226 35.129 52.087 30.683 54.068 C 27.799 55.358 24.706 56.003 21.402 56.003 L 20.41 56.003 C 14.763 56.003 10.078 54.293 6.353 50.871 C 4.34 49.011 2.778 46.64 1.667 43.758 C 0.556 40.847 0 37.726 0 34.394 L 0.045 33.359 L 0.045 32.324 C 0.045 29.442 0.706 26.606 2.028 23.815 C 3.379 21.024 4.986 18.728 6.848 16.927 C 10.783 13.145 15.454 11.24 20.861 11.21 C 29.031 11.21 34.468 14.391 37.171 20.754 C 38.012 22.765 38.433 24.61 38.433 26.291 L 38.433 27.191 C 38.433 29.262 37.577 30.658 35.865 31.378 C 34.152 32.068 30.112 32.639 23.744 33.089 C 17.377 33.539 13.922 33.839 13.382 33.989 C 11.339 34.499 10.318 35.79 10.318 37.861 Z" fill={color} />
    <path d="M 68.222 22.735 L 68.222 21.519 C 68.222 20.439 67.771 19.523 66.87 18.773 C 65.999 17.993 64.798 17.602 63.266 17.602 L 61.914 17.602 C 60.382 17.602 58.565 18.218 56.462 19.448 C 54.36 20.679 52.557 22.464 51.056 24.805 C 47.451 30.358 45.649 35.925 45.649 41.507 L 45.649 41.958 C 45.649 44.359 46.054 46.339 46.865 47.9 C 47.706 49.431 48.923 50.196 50.515 50.196 L 51.326 50.196 C 52.888 50.196 54.81 49.281 57.093 47.45 C 59.376 45.619 61.223 43.503 62.635 41.102 C 64.077 38.671 65.368 35.55 66.51 31.738 C 67.651 27.927 68.222 24.925 68.222 22.735 Z M 69.574 15.216 L 75.341 14.496 C 76.242 14.496 76.692 15.111 76.692 16.342 C 76.692 17.542 75.731 21.984 73.809 29.667 C 71.886 37.351 70.925 42.243 70.925 44.344 C 70.925 46.444 71.901 47.495 73.854 47.495 L 75.521 47.315 C 76.722 47.315 77.323 47.6 77.323 48.17 L 77.323 48.62 C 77.323 49.731 76.257 50.901 74.124 52.132 C 72.022 53.332 70.204 53.933 68.672 53.933 C 67.141 53.933 66.089 53.572 65.519 52.852 C 64.948 52.102 64.407 50.766 63.896 48.845 L 63.536 47.045 C 63.386 46.294 63.251 45.919 63.131 45.919 C 62.86 45.919 60.893 47.36 57.228 50.241 C 53.594 53.122 50.35 54.563 47.496 54.563 L 46.685 54.563 C 44.162 54.563 42.15 53.587 40.648 51.637 C 39.176 49.656 38.44 47.09 38.44 43.938 L 38.44 42.993 C 38.44 40.142 39.071 36.915 40.332 33.314 C 42.795 26.321 47.091 20.874 53.218 16.972 C 56.282 15.021 59.241 14.046 62.094 14.046 L 62.95 14.046 C 63.791 14.046 64.858 14.241 66.149 14.631 C 67.471 15.021 68.612 15.216 69.574 15.216 Z" fill={color} />
    <path d="M 97.425 49.251 L 104.274 48.215 C 105.055 48.215 105.445 48.83 105.445 50.061 C 105.445 51.261 104.289 52.507 101.976 53.798 C 99.663 55.088 97.23 55.733 94.677 55.733 L 93.776 55.733 C 91.763 55.733 89.946 55.208 88.324 54.158 C 86.702 53.107 85.516 51.817 84.765 50.286 C 83.473 47.615 82.827 42.558 82.827 35.115 C 82.827 27.642 82.557 22.975 82.016 21.114 C 81.506 19.253 80.83 17.978 79.989 17.287 C 78.427 16.027 77.646 15.336 77.646 15.216 C 77.646 14.436 78.051 13.776 78.862 13.236 C 80.935 11.855 82.061 11.075 82.241 10.895 C 82.452 10.684 83.608 8.223 85.711 3.511 C 86.762 1.17 87.949 0 89.27 0 C 90.622 0 91.523 0.48 91.974 1.441 C 92.094 1.681 92.349 2.986 92.739 5.357 C 93.16 7.728 93.746 9.259 94.497 9.949 C 95.248 10.609 96.915 11.255 99.498 11.885 C 102.081 12.485 103.373 13.356 103.373 14.496 C 103.373 15.637 101.946 16.492 99.092 17.062 C 96.239 17.632 94.512 18.368 93.911 19.268 C 92.86 20.799 92.334 25.121 92.334 32.233 C 92.334 39.346 92.664 43.833 93.325 45.694 C 94.166 48.065 95.533 49.251 97.425 49.251 Z" fill={color} />
  </svg>;


const ListLogo = ({ color = CORAL, height = 22 }) =>
<img src="assets/list.svg" alt="list" style={{ height, filter: color === 'white' ? 'brightness(0) invert(1)' : `brightness(0) saturate(100%) invert(51%) sepia(48%) saturate(1200%) hue-rotate(320deg) brightness(0.95)` }} />;


const EatlistWordmark = ({ dark: isDark = false, size = 'md' }) => {
  const h = size === 'lg' ? 38 : size === 'sm' ? 22 : 28;
  const col = isDark ? 'white' : CORAL;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
      <EatLogo color={col} height={h * 0.62} />
      <ListLogo color={isDark ? 'white' : CORAL} height={h * 0.48} />
    </div>);

};

// ── AppHeader ─────────────────────────────────────────────────────
const AppHeader = ({ dark, onListsOpen, onProfile }) => {
  const c = getC(dark);
  return (
    <div style={{ padding: '0 22px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: c.bg, borderBottom: `1px solid ${c.border}` }}>
      <EatlistWordmark dark={dark} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onListsOpen} style={{ width: 36, height: 36, borderRadius: 100, background: CORAL, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlusIc s={18} col="white" />
        </button>
        <button onClick={onProfile} style={{ width: 36, height: 36, borderRadius: 100, overflow: 'hidden', border: `2px solid ${c.border}`, cursor: 'pointer', padding: 0, background: 'none' }}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&crop=face" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>
      </div>
    </div>);

};

// ── NavHeader (back nav) ──────────────────────────────────────────
const NavHeader = ({ dark, onBack, title, right }) => {
  const c = getC(dark);
  return (
    <div style={{ padding: '0 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.bg, borderBottom: `1px solid ${c.border}` }}>
      <button onClick={onBack} style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
        <BackIc s={22} col={c.text} />
      </button>
      {title && <span style={{ ...ts(18, 700), color: c.text }}>{title}</span>}
      <div style={{ width: 32, display: 'flex', justifyContent: 'flex-end' }}>{right || null}</div>
    </div>);

};

// ── SearchInput ───────────────────────────────────────────────────
const SearchInput = ({ dark, value, onChange, onFocus, placeholder = 'Buscar', autoFocus = false }) => {
  const c = getC(dark);
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <SearchIc s={16} col={GRAY} />
      </div>
      <input
        value={value} onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={onFocus} placeholder={placeholder} autoFocus={autoFocus}
        style={{ width: '100%', height: 40, background: c.inputBg, border: 'none', borderRadius: 100, paddingLeft: 36, paddingRight: 12, ...ts(14), color: c.text, outline: 'none', caretColor: CORAL }} />
      
    </div>);

};

// ── Pill / Badge ──────────────────────────────────────────────────
const Pill = ({ label, active = false, dark, onClick, color }) => {
  const c = getC(dark);
  const bg = active ? CORAL : c.surf;
  const col = active ? 'white' : c.textSec;
  return (
    <button onClick={onClick} style={{ height: 33, padding: '0 14px', borderRadius: 100, background: color || bg, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, ...ts(14, 700), color: color ? 'white' : col }}>
      {label}
    </button>);

};

// ── ListCard (small, 2-col grid) ──────────────────────────────────
const ListCard = ({ list, dark, onClick }) => {
  const c = getC(dark);
  return (
    <div onClick={onClick} style={{ width: 158, flexShrink: 0, cursor: 'pointer' }}>
      <div style={{ width: 158, height: 158, borderRadius: 16, overflow: 'hidden', background: c.surf, marginBottom: 8 }}>
        <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div style={{ ...ts(18, 500), color: c.text, lineHeight: 1.1, marginBottom: 4 }}>{list.title}</div>
      <div style={{ ...ts(14), color: GRAY }}>{list.author}</div>
    </div>);

};

// ── ListCardHorizontal (in search / profile) ──────────────────────
const ListCardHoriz = ({ list, dark, onClick }) => {
  const c = getC(dark);
  return (
    <div onClick={onClick} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', cursor: 'pointer', borderBottom: `1px solid ${c.border}` }}>
      <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: c.surf }}>
        <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ ...ts(16, 500), color: c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{list.title}</div>
        <div style={{ ...ts(13), color: GRAY }}>{list.author} · {list.followers} seguidores</div>
      </div>
      <ArrowRightIc s={18} col={GRAY} />
    </div>);

};

// ── RestaurantCard (in list-open) ─────────────────────────────────
const RestaurantCard = ({ restaurant, dark, onOpen, onPlusClick, onLikesClick }) => {
  const c = getC(dark);
  return (
    <div onClick={onOpen} style={{ background: c.surf, borderRadius: 16, padding: '20px 20px 18px', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
        <button onClick={e => { e.stopPropagation(); onPlusClick && onPlusClick(); }}
          style={{ width: 32, height: 32, borderRadius: 100, background: CORAL, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <PlusIc s={15} col="white"/>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ ...ts(20, 500), color: c.text, lineHeight: 1.1 }}>{restaurant.name}</div>
        </div>
        <ArrowRightIc s={18} col={GRAY}/>
      </div>
      <div style={{ ...ts(13), color: GRAY, marginBottom: 10, paddingLeft: 44 }}>{restaurant.address}</div>
      <div style={{ display: 'flex', gap: 8, paddingLeft: 44 }}>
        {restaurant.friendsLiked > 0 && (
          <div onClick={e => { e.stopPropagation(); onLikesClick && onLikesClick('up'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: c.card, borderRadius: 100, padding: '5px 10px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
            <ThumbUpIc s={13} col={GREEN}/>
            <span style={{ ...ts(13, 700), color: GRAY }}>{restaurant.friendsLiked} amigo{restaurant.friendsLiked > 1 ? 's' : ''} gostou</span>
          </div>
        )}
        {restaurant.friendsDisliked > 0 && (
          <div onClick={e => { e.stopPropagation(); onLikesClick && onLikesClick('down'); }}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: c.card, borderRadius: 100, padding: '5px 10px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
            <ThumbDownIc s={13} col={CORAL}/>
            <span style={{ ...ts(13, 700), color: GRAY }}>{restaurant.friendsDisliked} {restaurant.friendsDisliked > 1 ? 'não gostaram' : 'não gostou'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ── LeafletMap ────────────────────────────────────────────────────
const LeafletMap = ({ dark, center, zoom = 14, markers = [], onMarkerClick, style: mapStyle = {} }) => {
  const ref = useRef(null);
  const mapR = useRef(null);
  const tileR = useRef(null);

  const tileUrl = (d) => d ?
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' :
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  useEffect(() => {
    if (!ref.current || mapR.current) return;
    const map = L.map(ref.current, { zoomControl: false, attributionControl: false }).setView(center, zoom);
    mapR.current = map;
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(map);

    markers.forEach((m) => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="width:32px;height:32px;background:${CORAL};border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.35);cursor:pointer;border:0px solid white;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
        </div>`,
        iconSize: [32, 32], iconAnchor: [16, 16]
      });
      const mk = L.marker([m.lat, m.lng], { icon }).addTo(map);
      if (onMarkerClick) mk.on('click', () => onMarkerClick(m));
    });

    return () => {if (mapR.current) {mapR.current.remove();mapR.current = null;}};
  }, []);

  useEffect(() => {
    if (!mapR.current || !tileR.current) return;
    mapR.current.removeLayer(tileR.current);
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(mapR.current);
  }, [dark]);

  return <div ref={ref} style={{ width: '100%', height: '100%', ...mapStyle }} />;
};

// ── MiniMap (static preview) ──────────────────────────────────────
const MiniMap = ({ dark, markers, onClick, style: s = {} }) => {
  const mapId = useRef(`minimap-${Math.random().toString(36).slice(2)}`);
  const mapR = useRef(null);
  const tileR = useRef(null);
  const tileUrl = (d) => d ?
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' :
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  useEffect(() => {
    const el = document.getElementById(mapId.current);
    if (!el || mapR.current) return;
    const map = L.map(el, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false }).setView([-23.5505, -46.6333], 13);
    mapR.current = map;
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    (markers || []).forEach((m) => {
      const icon = L.divIcon({ className: '', html: `<div style="width:20px;height:20px;background:${CORAL};border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`, iconSize: [20, 20], iconAnchor: [10, 10] });
      L.marker([m.lat, m.lng], { icon }).addTo(map);
    });
    return () => {if (mapR.current) {mapR.current.remove();mapR.current = null;}};
  }, []);

  useEffect(() => {
    if (!mapR.current || !tileR.current) return;
    mapR.current.removeLayer(tileR.current);
    tileR.current = L.tileLayer(tileUrl(dark), { maxZoom: 19, subdomains: 'abcd' }).addTo(mapR.current);
  }, [dark]);

  return <div id={mapId.current} onClick={onClick} style={{ width: '100%', height: '100%', cursor: 'pointer', ...s }} />;
};

// ── FriendRow ─────────────────────────────────────────────────────
const FriendRow = ({ friend, dark }) => {
  const c = getC(dark);
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px', background: c.surf, borderRadius: 14 }}>
      <img src={friend.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
      <span style={{ ...ts(17), color: c.text, flex: 1 }}>{friend.name}</span>
      <ArrowRightIc s={16} col={GRAY} />
    </div>);

};

// ── FeedCard (friend activity) ────────────────────────────────────
const FeedCard = ({ item, list, dark, go, isLast }) => {
  const c = getC(dark);
  const [following, setFollowing] = useState(item.following || false);
  return (
    <div style={{ paddingBottom: 24, marginBottom: 24, borderBottom: isLast ? 'none' : `1px solid ${c.border}` }}>
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <img src={item.friend.avatar} style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div>
          <div style={{ ...ts(15, 700), color: c.text, fontWeight: "400" }}>{item.friend.name}</div>
          <div style={{ ...ts(12), color: GRAY }}>{item.action} · {item.time} · seguindo</div>
        </div>
      </div>
      {/* List title + description */}
      <div onClick={() => go('list-open', { listId: list.id })} style={{ cursor: 'pointer', marginBottom: 14 }}>
        <div style={{ ...ts(22, 700), color: c.text, lineHeight: 1.1, marginBottom: 6, fontWeight: "400" }}>{list.title}</div>

      </div>

      {/* Restaurant photos */}
      <div style={{ display: 'flex', gap: 10 }}>
        {list.restaurants.slice(0, 2).map((r) =>
        <div key={r.id} onClick={() => go('restaurant', { restaurantId: r.id })}
        style={{ flex: 1, height: 128, borderRadius: 14, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}>
            <img src={r.photo || list.img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
            <span style={{ position: 'absolute', bottom: 8, left: 10, ...ts(13, 600), color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>{r.name}</span>
          </div>
        )}
      </div>
    </div>);

};

Object.assign(window, {
  StatusBar, EatLogo, ListLogo, EatlistWordmark,
  AppHeader, NavHeader, SearchInput, Pill,
  ListCard, ListCardHoriz, RestaurantCard,
  LeafletMap, MiniMap, FriendRow, FeedCard
});