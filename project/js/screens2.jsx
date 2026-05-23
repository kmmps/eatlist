// eatlist — Screens: Map, ListsGrid, ListOpen, Restaurant, Profile
const { useState, useEffect, useRef } = React;

// ── MapScreen ─────────────────────────────────────────────────────
const MapScreen = ({ dark, go, allLists }) => {
  const c = getC(dark);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selected, setSelected] = useState(null);
  const filters = ['Todos', 'Padaria', 'Hamburguer', 'Pizza', 'Japonês', 'Café'];

  const allRestaurants = allLists.flatMap(l =>
    l.restaurants.map(r => ({ ...r, listTitle: l.title, listCategory: l.category }))
  );

  const filtered = activeFilter === 'Todos'
    ? allRestaurants
    : allRestaurants.filter(r => r.listCategory === activeFilter || r.tags.includes(activeFilter));

  const center = [-23.5505, -46.6633];

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Filter bar (above map) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 600 }}>
        <StatusBar dark={dark}/>
        <div style={{ display: 'flex', gap: 8, padding: '8px 16px 12px', overflowX: 'auto', scrollbarWidth: 'none', background: dark ? 'rgba(5,6,21,0.92)' : 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)' }}>
          {filters.map(f => (
            <Pill key={f} label={f} active={activeFilter === f} dark={dark} onClick={() => setActiveFilter(f)}/>
          ))}
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
          style={{ height: '100%' }}
        />
      </div>

      {/* Bottom sheet: selected restaurant */}
      {selected && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 700 }}>
          {/* Backdrop tap to close */}
          <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, zIndex: -1 }}/>
          <div style={{ background: c.bg, borderRadius: '28px 28px 0 0', padding: '12px 22px 32px', boxShadow: '0 -4px 40px rgba(0,0,0,0.18)' }}>
            {/* Drag handle */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ ...ts(30), color: c.text, lineHeight: 1 }}>{list.title}</div>
                <button onClick={() => go('map')} style={{ width: 30, height: 30, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapIc s={18} col={GRAY}/>
                </button>
              </div>
              <div style={{ ...ts(14, 700), color: GRAY }}>Lista de {list.author}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ background: c.surf, borderRadius: 100, padding: '7px 14px', ...ts(13, 700), color: GRAY }}>
              {list.followers + (following ? 1 : 0)} seguidores
            </span>
            {/* Mutual followers */}
            {(() => {
              const mutuals = friends.slice(0, 2);
              const count = mutuals.length;
              if (count === 0) return null;
              const label = count === 1
                ? `${mutuals[0].name.split(' ')[0]} segue`
                : `${mutuals[0].name.split(' ')[0]} e mais ${count - 1} amigo${count > 2 ? 's' : ''} seguem`;
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: c.surf, borderRadius: 100, padding: '7px 12px 7px 6px' }}>
                  <div style={{ display: 'flex' }}>
                    {mutuals.map((f, i) => (
                      <img key={f.id} src={f.avatar} style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${c.bg}`, marginLeft: i > 0 ? -6 : 0 }}/>
                    ))}
                  </div>
                  <span style={{ ...ts(12, 600), color: GRAY }}>{label}</span>
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
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: c.bg, borderRadius: '28px 28px 0 0', padding: '12px 22px 40px', boxShadow: '0 -4px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 20px' }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              {friendsSheet.type === 'up' ? <ThumbUpIc s={18} col={GREEN}/> : <ThumbDownIc s={18} col={CORAL}/>}
              <span style={{ ...ts(18, 700), color: c.text }}>
                {friendsSheet.type === 'up' ? 'Amigos que gostaram' : 'Amigos que não gostaram'}
              </span>
            </div>
            <div style={{ ...ts(15, 600), color: GRAY, marginBottom: 12 }}>{friendsSheet.restaurant.name}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: c.bg, borderRadius: '28px 28px 0 0', padding: '12px 22px 40px', boxShadow: '0 -4px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ width: 40, height: 4, background: GRAY + '50', borderRadius: 2, margin: '0 auto 20px' }}/>
            <div style={{ ...ts(18, 700), color: c.text, marginBottom: 4 }}>Adicionar à lista</div>
            <div style={{ ...ts(14), color: GRAY, marginBottom: 20 }}>{addToListSheet.name}</div>

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
                      ? <span style={{ ...ts(12, 700), color: GREEN }}>✓ Adicionado</span>
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

  const [liked, setLiked] = useState(null); // null | 'up' | 'down'
  const [saved, setSaved] = useState(false);

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
                <button onClick={() => setSaved(v => !v)} style={{ width: 34, height: 34, borderRadius: 100, background: saved ? GREEN : CORAL, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {saved
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <PlusIc s={15} col="white"/>}
                </button>
                <span style={{ ...ts(28), color: c.text, lineHeight: 1 }}>{restaurant.name}</span>
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
          <span style={{ ...ts(12, 700), color: GRAY, cursor: 'pointer', borderBottom: `1px solid ${GRAY}` }}>Ver no Maps</span>

          {/* Like/dislike */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
            <button onClick={() => setLiked(v => v === 'up' ? null : 'up')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, border: 'none', cursor: 'pointer', background: liked === 'up' ? GREEN + '25' : c.surf, transition: 'all 0.15s' }}>
              <ThumbUpIc s={15} col={liked === 'up' ? GREEN : GRAY}/>
              <span style={{ ...ts(14, 700), color: liked === 'up' ? GREEN : GRAY }}>{restaurant.likes + (liked === 'up' ? 1 : 0)}</span>
            </button>
            <button onClick={() => setLiked(v => v === 'down' ? null : 'down')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, border: 'none', cursor: 'pointer', background: liked === 'down' ? CORAL + '20' : c.surf, transition: 'all 0.15s' }}>
              <ThumbDownIc s={15} col={liked === 'down' ? CORAL : GRAY}/>
              <span style={{ ...ts(14, 700), color: liked === 'down' ? CORAL : GRAY }}>{restaurant.dislikes + (liked === 'down' ? 1 : 0)}</span>
            </button>
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
