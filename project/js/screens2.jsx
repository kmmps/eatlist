// eatlist — Screens: Map, ListsGrid, ListOpen, Restaurant, Profile
const { useState, useEffect, useRef } = React;

// ── MapScreen ─────────────────────────────────────────────────────
const MapScreen = ({ dark, go, allLists }) => {
  const c = getC(dark);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const filters = ['Todos', 'Abertos agora', 'Salvos', 'Amigos gostaram'];

  const allRestaurants = allLists.flatMap(l =>
    l.restaurants.map(r => ({ ...r, listTitle: l.title, listCategory: l.category }))
  );

  const byFilter = activeFilter === 'Todos'
    ? allRestaurants
    : activeFilter === 'Abertos agora'
    ? allRestaurants.filter(r => r.isOpen !== false)
    : activeFilter === 'Salvos'
    ? allRestaurants.filter(r => r.saved)
    : activeFilter === 'Amigos gostaram'
    ? allRestaurants.filter(r => r.friendsLiked > 0)
    : allRestaurants;

  const filtered = query.trim()
    ? byFilter.filter(r => r.name.toLowerCase().includes(query.trim().toLowerCase()))
    : byFilter;

  const center = [-23.5505, -46.6633];

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Filter bar + search bar (above map) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 600 }}>
        <StatusBar dark={dark}/>
        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 8, padding: '8px 16px 10px', overflowX: 'auto', scrollbarWidth: 'none', background: dark ? 'rgba(5,6,21,0.95)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
          {filters.map(f => {
            const isActive = activeFilter === f;
            return (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                height: 36, padding: '0 12px', borderRadius: 8, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                fontFamily: '"DM Sans", sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1.2,
                background: isActive ? 'transparent' : (dark ? '#1a1b2e' : '#F4F4F4'),
                color: isActive ? CORAL : GRAY,
                border: isActive ? `1.5px solid ${CORAL}` : '1.5px solid transparent',
              }}>{f}</button>
            );
          })}
        </div>
        {/* Search bar floating below filters */}
        <div style={{ padding: '0 16px 12px', background: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: dark ? 'rgba(5,6,21,0.92)' : 'rgba(255,255,255,0.95)', borderRadius: 32, padding: '10px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)' }}>
            <SearchIc s={18} col={GRAY}/>
            <input
              type="text"
              placeholder="Buscar no mapa..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: '"DM Sans", sans-serif', fontSize: 15, color: dark ? '#FFF' : '#333', letterSpacing: '-0.05em', flex: 1, width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Full-screen map */}
      <div style={{ flex: 1 }}>
        <LeafletMap
          dark={dark}
          center={center}
          zoom={13}
          markers={filtered}
          onMarkerClick={r => setSelected(r)}
          activeFilter={activeFilter}
          style={{ height: '100%' }}
        />
      </div>

      {/* Bottom sheet: selected restaurant */}
      {selected && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 700 }}>
          <div onClick={() => setSelected(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
          <div style={{ position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, background: c.bg, borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 40px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 22px 0', flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 16px' }}/>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ ...ts(24), color: c.text, marginBottom: 4, lineHeight: 1 }}>{selected.name}</div>
                  <div style={{ ...ts(13), color: GRAY }}>{selected.address}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
                  <CloseIc s={18} col={GRAY}/>
                </button>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px', paddingBottom: 90 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {selected.tags.map(t => (
                  <span key={t} style={{ background: c.surf, borderRadius: 100, padding: '5px 12px', ...ts(13), color: GRAY }}>{t}</span>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: GREEN + '20', borderRadius: 100, padding: '5px 12px' }}>
                  <ThumbUpIc s={12} col={GREEN}/>
                  <span style={{ ...ts(13, 700), color: GREEN }}>{selected.likes}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: CORAL + '15', borderRadius: 100, padding: '5px 12px' }}>
                  <ThumbDownIc s={12} col={CORAL}/>
                  <span style={{ ...ts(13, 700), color: CORAL }}>{selected.dislikes}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => { go('restaurant', { restaurantId: selected.id }); setSelected(null); }}
                  style={{ flex: 1, height: 46, background: CORAL, border: 'none', borderRadius: 14, cursor: 'pointer', ...ts(15, 700), color: 'white' }}>
                  Ver restaurante
                </button>
                <button style={{ width: 46, height: 46, background: c.surf, border: 'none', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShareIc s={18} col={GRAY}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav space */}
      <div style={{ height: 82, background: 'transparent' }}/>
    </div>
  );
};

// ── ListsGridScreen ───────────────────────────────────────────────
const ListsGridScreen = ({ dark, go, back, allLists }) => {
  const c = getC(dark);
  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={dark}/>
      <div style={{ padding: '0 22px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${c.border}` }}>
        <span style={{ ...ts(16), color: GRAY }}>Suas Listas</span>
        <button onClick={back} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
          <CloseIc s={20} col={GRAY}/>
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 20px' }}>
          {allLists.map(list => (
            <ListCard key={list.id} list={list} dark={dark} onClick={() => go('list-open', { listId: list.id })}/>
          ))}
        </div>

        {/* Create new list */}
        <div style={{ marginTop: 20, marginBottom: 24 }}>
          <button style={{ width: '100%', height: 54, border: `2px dashed ${c.border}`, borderRadius: 16, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <PlusIc s={18} col={GRAY}/>
            <span style={{ ...ts(15, 500), color: GRAY }}>Criar nova lista</span>
          </button>
        </div>
        <div style={{ height: 60 }}/>
      </div>
    </div>
  );
};

// ── ListOpenScreen ────────────────────────────────────────────────
const ListOpenScreen = ({ dark, go, back, listId, allLists }) => {
  const c    = getC(dark);
  const list = allLists.find(l => l.id === listId) || allLists[0];
  const [following, setFollowing] = useState(false);
  const [friendsSheet, setFriendsSheet] = useState(null); // { type: 'up'|'down', restaurant }
  const [addToListSheet, setAddToListSheet] = useState(null); // restaurant
  const [followersSheet, setFollowersSheet] = useState(false);
  const followLongPressTimer = useRef(null);

  const startFollowLongPress = () => {
    followLongPressTimer.current = setTimeout(() => {
      followLongPressTimer.current = 'fired';
      setFollowersSheet(true);
    }, 500);
  };
  const cancelFollowLongPress = () => {
    if (followLongPressTimer.current && followLongPressTimer.current !== 'fired') {
      clearTimeout(followLongPressTimer.current);
    }
    followLongPressTimer.current = null;
  };

  if (!list) return null;

  const friends = window.DATA.friends;

  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={dark}/>
      <NavHeader dark={dark} onBack={back} right={<MoreIc s={20} col={GRAY}/>}/>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Cover image */}
        <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
          <img src={list.img} alt={list.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)' }}/>
        </div>

        {/* Title section */}
        <div style={{ padding: '20px 24px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div style={{ flex: 1 }}>
              {/* Title + map icon inline */}
              <div style={{ marginBottom: 6 }}>
                <div style={{ ...ts(30, 600), color: c.text, lineHeight: 1 }}>{list.title}</div>
              </div>
              <div style={{ ...ts(14, 700), color: GRAY }}>Lista de {list.author}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ background: c.surf, borderRadius: 100, padding: '7px 14px', ...ts(13, 700), color: GRAY }}>
              {list.followers + (following ? 1 : 0)} seguidores
            </span>
            {/* Mutual followers — avatars only */}
            {(() => {
              const mutuals = friends.slice(0, 3);
              if (mutuals.length === 0) return null;
              return (
                <div
                  onPointerDown={startFollowLongPress}
                  onPointerUp={cancelFollowLongPress}
                  onPointerLeave={cancelFollowLongPress}
                  onContextMenu={e => e.preventDefault()}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, background: c.surf, borderRadius: 100, padding: '5px 10px 5px 8px', cursor: 'pointer', userSelect: 'none' }}>
                  {mutuals.map((f, i) => (
                    <img key={f.id} src={f.avatar} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${c.bg}`, marginLeft: i > 0 ? -8 : 0 }}/>
                  ))}
                  <span style={{ ...ts(12, 600), color: GRAY }}>{mutuals.length === 1 ? 'segue' : 'seguem'}</span>
                </div>
              );
            })()}
            <button onClick={() => setFollowing(v => !v)}
              style={{ background: following ? GREEN : CORAL, border: 'none', borderRadius: 100, padding: '7px 16px', cursor: 'pointer', ...ts(13, 700), color: 'white' }}>
              {following ? '✓ Seguindo' : 'Seguir'}
            </button>
          </div>
        </div>

        {/* Restaurants header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 24px 14px' }}>
          <span style={{ ...ts(15, 600), color: GRAY }}>Restaurantes ({list.restaurants.length})</span>
          <button onClick={() => go('map')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <MapIc s={18} col={GRAY}/>
          </button>
        </div>

        {/* Restaurant list */}
        <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {list.restaurants.map(r => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              dark={dark}
              onOpen={() => go('restaurant', { restaurantId: r.id })}
              onPlusClick={() => setAddToListSheet(r)}
              onLikesClick={type => setFriendsSheet({ type, restaurant: r })}
            />
          ))}
        </div>
        <div style={{ height: 100 }}/>
      </div>

      {/* Friends liked bottom sheet */}
      {friendsSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 800 }}>
          <div onClick={() => setFriendsSheet(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
          <div style={{ position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, background: c.bg, borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 22px 0', flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 20px' }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                {friendsSheet.type === 'up' ? <ThumbUpIc s={18} col={GREEN}/> : <ThumbDownIc s={18} col={CORAL}/>}
                <span style={{ ...ts(18, 700), color: c.text }}>
                  {friendsSheet.type === 'up' ? 'Amigos que gostaram' : 'Amigos que não gostaram'}
                </span>
              </div>
              <div style={{ ...ts(15, 600), color: GRAY, marginBottom: 16 }}>{friendsSheet.restaurant.name}</div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px', paddingBottom: 90, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {friends.slice(0, friendsSheet.type === 'up' ? friendsSheet.restaurant.friendsLiked : friendsSheet.restaurant.friendsDisliked).map(f => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={f.avatar} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}/>
                  <span style={{ ...ts(16), color: c.text }}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add to list bottom sheet */}
      {addToListSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 800 }}>
          <div onClick={() => setAddToListSheet(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
          <div style={{ position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, background: c.bg, borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 22px 0', flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 20px' }}/>
              <div style={{ ...ts(18, 700), color: c.text, marginBottom: 4 }}>Adicionar à lista</div>
              <div style={{ ...ts(14), color: GRAY, marginBottom: 20 }}>{addToListSheet.name}</div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px', paddingBottom: 90 }}>
              {/* Existing lists */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {allLists.map(l => {
                  const alreadyIn = l.restaurants.some(r => r.id === addToListSheet.id);
                  return (
                    <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: c.surf, borderRadius: 14, cursor: 'pointer' }}
                      onClick={() => !alreadyIn && setAddToListSheet(null)}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                        <img src={l.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ ...ts(15, 500), color: c.text }}>{l.title}</div>
                        <div style={{ ...ts(12), color: GRAY }}>{l.restaurants.length} restaurantes</div>
                      </div>
                      {alreadyIn
                        ? <span style={{ ...ts(12, 700), color: GREEN }}>Adicionado</span>
                        : <PlusIc s={16} col={GRAY}/>}
                    </div>
                  );
                })}
              </div>

              {/* Create new */}
              <button onClick={() => { setAddToListSheet(null); go('new-list'); }}
                style={{ width: '100%', height: 48, border: `2px dashed ${c.border}`, borderRadius: 14, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <PlusIc s={16} col={GRAY}/>
                <span style={{ ...ts(14, 600), color: GRAY }}>Criar nova lista</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Followers sheet — long press on badge */}
      {followersSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 900 }}>
          <div onClick={() => setFollowersSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
          <div style={{ position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, background: c.bg, borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 22px 0', flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 20px' }}/>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <UserIc s={15} col={CORAL}/>
                  <span style={{ ...ts(18, 700), color: c.text }}>Amigos que seguem</span>
                </div>
                <button onClick={() => setFollowersSheet(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
                  <CloseIc s={20} col={GRAY}/>
                </button>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px', paddingBottom: 90, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {friends.map(f => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: c.surf, borderRadius: 16 }}>
                  <img src={f.avatar} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
                  <span style={{ ...ts(16), color: c.text, flex: 1 }}>{f.name}</span>
                  <button style={{ border: 'none', background: 'white', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <UserIc s={16} col={GRAY}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── RestaurantScreen ──────────────────────────────────────────────
const RestaurantScreen = ({ dark, go, back, restaurantId, allLists }) => {
  const c = getC(dark);
  const allR = allLists.flatMap(l => l.restaurants.map(r => ({ ...r, listTitle: l.title })));
  const restaurant = allR.find(r => r.id === restaurantId) || allR[0];
  const inLists = allLists.filter(l => l.restaurants.some(r => r.id === restaurantId));
  const friends = window.DATA.friends;

  const [liked, setLiked] = useState(null); // null | 'up' | 'down'
  const [friendsSheet, setFriendsSheet] = useState(null); // null | 'up' | 'down'
  const [listSheet, setListSheet] = useState(false);
  // ids of lists this restaurant has been added to (starts from what's already in data)
  const [addedToLists, setAddedToLists] = useState(
    () => new Set(allLists.filter(l => l.restaurants.some(r => r.id === restaurantId)).map(l => l.id))
  );
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const toggleList = (listId) => {
    setAddedToLists(prev => {
      const next = new Set(prev);
      const adding = !next.has(listId);
      adding ? next.add(listId) : next.delete(listId);
      if (adding) {
        const listName = allLists.find(l => l.id === listId)?.title;
        clearTimeout(toastTimer.current);
        setToast(listName);
        toastTimer.current = setTimeout(() => setToast(null), 2500);
      }
      return next;
    });
  };
  const longPressTimer = useRef(null);

  const startLongPress = (type) => {
    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = 'fired';
      setFriendsSheet(type);
    }, 500);
  };
  const cancelLongPress = () => {
    if (longPressTimer.current && longPressTimer.current !== 'fired') {
      clearTimeout(longPressTimer.current);
    }
    longPressTimer.current = null;
  };
  const handleLikeClick = (type) => {
    if (longPressTimer.current === 'fired') { longPressTimer.current = null; return; }
    cancelLongPress();
    setLiked(v => v === type ? null : type);
  };

  if (!restaurant) return null;
  const mapId = useRef(`rmap-${restaurantId}`);
  const mapR  = useRef(null);

  useEffect(() => {
    const el = document.getElementById(mapId.current);
    if (!el || mapR.current) return;
    const tileUrl = dark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    const map = L.map(el, { zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false })
      .setView([restaurant.lat, restaurant.lng], 15);
    mapR.current = map;
    L.tileLayer(tileUrl, { maxZoom: 19, subdomains: 'abcd' }).addTo(map);
    const icon = L.divIcon({ className: '', html: `<div style="width:36px;height:36px;background:${CORAL};border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.3);border:0px solid white;"><svg width='14' height='14' viewBox='0 0 24 24' fill='white'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/></svg></div>`, iconSize: [36, 36], iconAnchor: [18, 18] });
    L.marker([restaurant.lat, restaurant.lng], { icon }).addTo(map);
    return () => { if (mapR.current) { mapR.current.remove(); mapR.current = null; } };
  }, [restaurantId]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar dark={dark}/>
      <NavHeader dark={dark} onBack={back} right={
        <button onClick={() => {}} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2 }}>
          <ShareIc s={20} col={GRAY}/>
        </button>
      }/>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Title */}
        <div style={{ padding: '16px 24px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <button onClick={() => setListSheet(true)} style={{ width: 34, height: 34, borderRadius: 100, background: CORAL, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PlusIc s={15} col="white"/>
                </button>
                <span style={{ ...ts(28, 600), color: c.text, lineHeight: 1 }}>{restaurant.name}</span>
              </div>
            </div>
            <MoreIc s={20} col={GRAY}/>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {restaurant.tags.map(t => (
              <span key={t} style={{ background: c.surf, borderRadius: 100, padding: '5px 12px', ...ts(13), color: GRAY }}>{t}</span>
            ))}
          </div>

          {/* Address */}
          <div style={{ ...ts(13), color: GRAY, marginBottom: 4 }}>{restaurant.address}</div>
          <span onClick={() => window.open('https://maps.google.com/?q=' + encodeURIComponent(restaurant.address), '_blank')} style={{ ...ts(12, 700), color: CORAL, cursor: 'pointer' }}>Abrir no Google Maps</span>

          {/* Like/dislike */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
            {[{ type: 'up', count: restaurant.likes + (liked === 'up' ? 1 : 0), friendCount: restaurant.friendsLiked, activeCol: GREEN },
              { type: 'down', count: restaurant.dislikes + (liked === 'down' ? 1 : 0), friendCount: restaurant.friendsDisliked, activeCol: CORAL }
            ].map(({ type, count, friendCount, activeCol }) => {
              const isActive = liked === type;
              const col = isActive ? activeCol : GRAY;
              const avatars = friends.slice(0, Math.min(friendCount, 3));
              return (
                <button key={type}
                  onPointerDown={() => startLongPress(type)}
                  onPointerUp={() => handleLikeClick(type)}
                  onPointerLeave={cancelLongPress}
                  onContextMenu={e => e.preventDefault()}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, border: 'none', cursor: 'pointer', background: isActive ? activeCol + '25' : c.surf, transition: 'all 0.15s', userSelect: 'none' }}>
                  {type === 'up'
                    ? <ThumbUpIc s={15} col={col}/>
                    : <ThumbDownIc s={15} col={col}/>}
                  <span style={{ ...ts(14, 700), color: col }}>{count}</span>
                  {friendCount > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {avatars.map((f, i) => (
                        <img key={f.id} src={f.avatar} style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${c.bg}`, marginLeft: i === 0 ? 2 : -5, zIndex: avatars.length - i, position: 'relative' }}/>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Map */}
        <div style={{ height: 200, position: 'relative', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
          <div id={mapId.current} style={{ width: '100%', height: '100%' }}/>
          <button onClick={() => go('map')} style={{ position: 'absolute', bottom: 12, right: 12, background: DARK, border: 'none', borderRadius: 100, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', zIndex: 500 }}>
            <ListIc s={13} col="white"/>
            <span style={{ ...ts(13, 700), color: 'white' }}>Ver no mapa</span>
          </button>
        </div>

        {/* Está nas listas */}
        {inLists.length > 0 && (
          <div style={{ padding: '20px 22px 0' }}>
            <div style={{ ...ts(16), color: GRAY, marginBottom: 12 }}>Está nas listas</div>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
              {inLists.map(l => (
                <ListCard key={l.id} list={l} dark={dark} onClick={() => go('list-open', { listId: l.id })}/>
              ))}
            </div>
          </div>
        )}
        <div style={{ height: 100 }}/>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'absolute', bottom: 90, left: 16, right: 16, zIndex: 1000, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ background: '#050615', borderRadius: 100, padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
            <svg width="14" height="14" viewBox="0 0 54 54" fill="none">
              <path d="M22.5503 51.1206C25.9262 50.5146 29.1724 49.3491 32.5099 48.5743C35.2624 47.9351 37.8459 47.0116 40.5451 46.1848C53.2862 42.2843 51.8814 45.5188 40.4911 35.2055C39.514 34.3205 37.6636 33.7213 37.2672 32.244C36.4855 29.3299 42.2864 19.6016 43.594 17.4493C45.52 14.2803 32.1051 6.5915 29.5623 3.954" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22.1451 50.8673C20.0013 48.2918 17.1909 46.4302 14.689 44.2325C4.40657 35.1995 9.07298 35.1788 13.7174 22.9759C13.8619 22.5951 15.1697 20.4558 15.052 20.0173C14.8624 19.3105 13.5679 19.8497 12.9102 19.5271C8.62132 17.4178 4.88261 14.3768 1.00016 11.7195" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.22551 11.702C10.2539 9.19623 20.5497 7.13115 29.3509 3.89591" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.2648 38.5271C11.229 39.0895 9.40909 38.4649 9.65205 38.2495C11.5416 36.5749 30.9435 35.4126 36.2561 32.9019" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.7258 20.0275C22.3282 18.2312 33.4805 16.5459 42.1384 15.1319" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ ...ts(14, 700), color: 'white', whiteSpace: 'nowrap' }}>Adicionado a {toast}</span>
          </div>
        </div>
      )}

      {/* Add to list — bottom sheet */}
      {listSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 900 }}>
          <div onClick={() => setListSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
          <div style={{ position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, background: c.bg, borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 22px 0', flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 20px' }}/>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ ...ts(18, 700), color: c.text }}>Suas listas</span>
              <button onClick={() => setListSheet(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
                <CloseIc s={20} col={GRAY}/>
              </button>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px', paddingBottom: 90 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {allLists.map(l => {
                  const isAdded = addedToLists.has(l.id);
                  return (
                    <div key={l.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: c.surf, borderRadius: 14, cursor: 'pointer' }}
                      onClick={() => isAdded ? (setListSheet(false), go('list-open', { listId: l.id })) : toggleList(l.id)}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                        <img src={l.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ ...ts(15, 500), color: c.text }}>{l.title}</div>
                        <div style={{ ...ts(12), color: GRAY }}>{l.restaurants.length} restaurantes</div>
                      </div>
                      {isAdded
                        ? <span style={{ ...ts(12, 700), color: GREEN }}>Adicionado</span>
                        : <PlusIc s={16} col={GRAY}/>}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => { setListSheet(false); go('new-list'); }}
                style={{ width: '100%', height: 48, border: `2px dashed ${c.border}`, borderRadius: 14, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <PlusIc s={16} col={GRAY}/>
                <span style={{ ...ts(14, 600), color: GRAY }}>Criar nova lista</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quem gostou / não gostou — bottom sheet on long press */}
      {friendsSheet && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 900 }}>
          <div onClick={() => setFriendsSheet(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
          <div style={{ position: 'absolute', top: 60, left: 0, right: 0, bottom: 0, background: c.bg, borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 22px 0', flexShrink: 0 }}>
              <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 20px' }}/>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {friendsSheet === 'up' ? <ThumbUpIc s={15} col={CORAL}/> : <ThumbDownIc s={15} col={CORAL}/>}
                  <span style={{ ...ts(18, 700), color: c.text }}>{friendsSheet === 'up' ? 'Quem gostou' : 'Quem não gostou'}</span>
                </div>
                <button onClick={() => setFriendsSheet(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
                  <CloseIc s={20} col={GRAY}/>
                </button>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px', paddingBottom: 90, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {friends.slice(0, friendsSheet === 'up' ? restaurant.friendsLiked : restaurant.friendsDisliked).map(f => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, background: c.surf, borderRadius: 16 }}>
                  <img src={f.avatar} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
                  <span style={{ ...ts(16), color: c.text, flex: 1 }}>{f.name}</span>
                  <button style={{ border: 'none', background: c.bg, borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <UserIc s={16} col={GRAY}/>
                  </button>
                </div>
              ))}
              {(friendsSheet === 'up' ? restaurant.friendsLiked : restaurant.friendsDisliked) === 0 && (
                <div style={{ textAlign: 'center', padding: '24px 0', ...ts(15), color: GRAY }}>Nenhum amigo ainda</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ProfileScreen ─────────────────────────────────────────────────
const ProfileScreen = ({ dark, go, back, allLists }) => {
  const c    = getC(dark);
  const user = window.DATA.user;
  const [tab, setTab] = useState('listas');
  const myLists = allLists.filter(l => user.myListIds.includes(l.id));

  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={dark}/>
      <NavHeader dark={dark} onBack={back} right={
        <button onClick={() => {}} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2 }}>
          <ShareIc s={20} col={GRAY}/>
        </button>
      }/>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Profile header */}
        <div style={{ padding: '20px 24px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ position: 'relative' }}>
              <img src={user.avatar} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${c.border}` }}/>
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: c.surf, border: `2px solid ${c.bg}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CameraIc s={13} col={GRAY}/>
              </button>
            </div>
            <button style={{ height: 34, padding: '0 16px', background: c.surf, border: 'none', borderRadius: 100, cursor: 'pointer', ...ts(13, 600), color: c.text }}>
              Editar perfil
            </button>
          </div>

          <div style={{ ...ts(28), color: c.text, marginBottom: 6 }}>{user.name}</div>
          <div style={{ ...ts(14), color: GRAY, marginBottom: 12 }}>{user.handle}</div>

          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: c.surf, borderRadius: 100, padding: '7px 14px', ...ts(13, 700), color: GRAY, cursor: 'pointer' }}>
              {user.followers} seguidores
            </span>
            <span style={{ background: c.surf, borderRadius: 100, padding: '7px 14px', ...ts(13, 700), color: GRAY, cursor: 'pointer' }}>
              {user.following} seguindo
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `2px solid ${c.border}`, padding: '0 22px' }}>
          {['listas', 'pins', 'locais'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, height: 44, border: 'none', background: 'none', cursor: 'pointer', ...ts(14, 600), color: tab === t ? CORAL : GRAY, borderBottom: tab === t ? `2px solid ${CORAL}` : '2px solid transparent', marginBottom: -2, transition: 'all 0.15s', textTransform: 'capitalize' }}>
              {t === 'listas' ? 'Listas' : t === 'pins' ? 'Pins' : 'Locais'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: '20px 22px 0' }}>
          {tab === 'listas' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 20px' }}>
              {myLists.map(l => (
                <ListCard key={l.id} list={l} dark={dark} onClick={() => go('list-open', { listId: l.id })}/>
              ))}
              <div onClick={() => {}} style={{ width: 158, cursor: 'pointer' }}>
                <div style={{ width: 158, height: 158, borderRadius: 16, border: `2px dashed ${c.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <PlusIc s={20} col={GRAY}/>
                  <span style={{ ...ts(13), color: GRAY }}>Nova lista</span>
                </div>
              </div>
            </div>
          )}
          {tab === 'pins' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <HeartIc s={40} col={`${GRAY}50`}/>
              <div style={{ ...ts(15), color: GRAY, marginTop: 12 }}>Nenhum pin ainda</div>
            </div>
          )}
          {tab === 'locais' && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <MapIc s={40} col={`${GRAY}50`}/>
              <div style={{ ...ts(15), color: GRAY, marginTop: 12 }}>Nenhum local visitado</div>
            </div>
          )}
        </div>
        <div style={{ height: 100 }}/>
      </div>
    </div>
  );
};

Object.assign(window, { MapScreen, ListsGridScreen, ListOpenScreen, RestaurantScreen, ProfileScreen });
