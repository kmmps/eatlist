// eatlist — Icons
// All icons exported to window

const Ic = ({ s = 24, fill = 'none', vb = '0 0 24 24', children, style, ...p }) => (
  <svg width={s} height={s} viewBox={vb} fill={fill} strokeLinecap="round" strokeLinejoin="round" style={style} {...p}>
    {children}
  </svg>
);

const HomeIc   = ({ s=24, col='#8D9091' }) => <Ic s={s}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke={col} strokeWidth="1.5"/><path d="M9 22V12h6v10" stroke={col} strokeWidth="1.5"/></Ic>;
const SearchIc = ({ s=24, col='#8D9091' }) => <Ic s={s}><circle cx="11" cy="11" r="7" stroke={col} strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke={col} strokeWidth="1.5"/></Ic>;
const MapIc    = ({ s=24, col='#8D9091' }) => <Ic s={s}><polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" stroke={col} strokeWidth="1.5" fill="none"/><line x1="9" y1="3" x2="9" y2="18" stroke={col} strokeWidth="1.5"/><line x1="15" y1="6" x2="15" y2="21" stroke={col} strokeWidth="1.5"/></Ic>;
const UserIc   = ({ s=24, col='#8D9091' }) => <Ic s={s}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={col} strokeWidth="1.5"/><circle cx="12" cy="7" r="4" stroke={col} strokeWidth="1.5"/></Ic>;
const BackIc   = ({ s=22, col='#05061 5' }) => <Ic s={s}><path d="M19 12H5M12 5l-7 7 7 7" stroke={col} strokeWidth="1.5"/></Ic>;
const PlusIc   = ({ s=20, col='white' }) => <Ic s={s}><line x1="12" y1="5" x2="12" y2="19" stroke={col} strokeWidth="2"/><line x1="5" y1="12" x2="19" y2="12" stroke={col} strokeWidth="2"/></Ic>;
const PinIc    = ({ s=16, col='white' }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={col}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
const HeartIc  = ({ s=20, col='#8D9091', filled=false }) => <Ic s={s}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke={col} strokeWidth="1.5" fill={filled ? col : 'none'}/></Ic>;
const ThumbUpIc   = ({ s=15, col='#71CC97' }) => <Ic s={s}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke={col} strokeWidth="1.5"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" stroke={col} strokeWidth="1.5"/></Ic>;
const ThumbDownIc = ({ s=15, col='#EB6558' }) => <Ic s={s}><path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" stroke={col} strokeWidth="1.5"/><path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" stroke={col} strokeWidth="1.5"/></Ic>;
const ShareIc  = ({ s=20, col='#8D9091' }) => <Ic s={s}><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke={col} strokeWidth="1.5"/><polyline points="16,6 12,2 8,6" stroke={col} strokeWidth="1.5"/><line x1="12" y1="2" x2="12" y2="15" stroke={col} strokeWidth="1.5"/></Ic>;
const MoreIc   = ({ s=20, col='#8D9091' }) => <Ic s={s} fill={col}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></Ic>;
const CloseIc  = ({ s=20, col='#8D9091' }) => <Ic s={s}><line x1="18" y1="6" x2="6" y2="18" stroke={col} strokeWidth="1.5"/><line x1="6" y1="6" x2="18" y2="18" stroke={col} strokeWidth="1.5"/></Ic>;
const ArrowRightIc = ({ s=20, col='#8D9091' }) => <Ic s={s}><polyline points="9,18 15,12 9,6" stroke={col} strokeWidth="1.5"/></Ic>;
const ChevronDownIc = ({ s=14, col='#3C3736' }) => <Ic s={s}><polyline points="4,6 10,12 16,6" stroke={col} strokeWidth="1.5"/></Ic>;
const EyeIc    = ({ s=18, col='#8D9091' }) => <Ic s={s}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={col} strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke={col} strokeWidth="1.5"/></Ic>;
const ListIc   = ({ s=16, col='white' }) => <Ic s={s} fill={col}><rect x="3" y="5" width="18" height="2" rx="1"/><rect x="3" y="11" width="18" height="2" rx="1"/><rect x="3" y="17" width="12" height="2" rx="1"/></Ic>;
const CameraIc = ({ s=16, col='#8D9091' }) => <Ic s={s}><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" stroke={col} strokeWidth="1.5"/><circle cx="12" cy="13" r="4" stroke={col} strokeWidth="1.5"/></Ic>;
const StarIc   = ({ s=14, col='#EB6558', filled=true }) => <Ic s={s} fill={filled ? col : 'none'}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={col} strokeWidth="1.5"/></Ic>;
const DirectionIc = ({ s=16, col='#3C3736' }) => <Ic s={s}><polygon points="3,11 22,2 13,21 11,13" stroke={col} strokeWidth="1.5" fill="none"/></Ic>;

const GoogleIc = ({ s=20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const InstagramIc = ({ s=20 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#elig)" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="4" stroke="url(#elig)" strokeWidth="1.5"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C"/>
    <defs>
      <linearGradient id="elig" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEDA75"/><stop offset=".3" stopColor="#FA7E1E"/>
        <stop offset=".6" stopColor="#D62976"/><stop offset="1" stopColor="#4F5BD5"/>
      </linearGradient>
    </defs>
  </svg>
);

Object.assign(window, {
  HomeIc, SearchIc, MapIc, UserIc, BackIc, PlusIc, PinIc, HeartIc,
  ThumbUpIc, ThumbDownIc, ShareIc, MoreIc, CloseIc, ArrowRightIc,
  ChevronDownIc, EyeIc, ListIc, CameraIc, StarIc, DirectionIc,
  GoogleIc, InstagramIc
});
