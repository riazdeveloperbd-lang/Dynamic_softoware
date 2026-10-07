import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Users,
  CheckCircle2,
  Send,
  Leaf,
  Award,
} from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import velvetRoasteryStory from '../../../assets/images/velvet_roastery_story_1791387897759.jpg';

export interface CoffeeLocationsWholesaleStorySectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const CAFE_LOCATIONS = [
  {
    id: 'loc_pearl',
    name: 'Pearl District Roastery & Tasting Room',
    status: 'Open Now — Closes at 6 PM',
    address: '418 NW 11th Ave, Portland, OR 97209',
    phone: '(503) 555-0142',
    seatingPct: 68,
    seatingLabel: '68% Full · 14 Communal & Window Seats Open',
    coords: { x: 210, y: 145 },
    transit: 'Streetcar NS Line Stop 1 block east · Bike corral out front',
  },
  {
    id: 'loc_hawthorne',
    name: 'Hawthorne Conservatory Espresso Bar',
    status: 'Open Now — Closes at 7 PM',
    address: '3422 SE Hawthorne Blvd, Portland, OR 97214',
    phone: '(503) 555-0198',
    seatingPct: 45,
    seatingLabel: '45% Full · Sunlit Garden Patio Open',
    coords: { x: 430, y: 230 },
    transit: 'TriMet Line 14 · Free 2-hour neighborhood parking',
  },
  {
    id: 'loc_nob_hill',
    name: 'Nob Hill Corner Bakery & Pour-Over Studio',
    status: 'Open Now — Closes at 6 PM',
    address: '2105 NW 23rd Ave, Portland, OR 97210',
    phone: '(503) 555-0166',
    seatingPct: 82,
    seatingLabel: '82% Full · 5 Bar Stools Available',
    coords: { x: 140, y: 95 },
    transit: '23rd Ave Shopping District · Express Pickup Window',
  },
];

export const CoffeeLocationsWholesaleStorySection: React.FC<
  CoffeeLocationsWholesaleStorySectionProps
> = ({
  title = 'Visit Our Cafes & Roastery Tasting Rooms',
  subtitle = 'Experience live small-batch drum roasting, seasonal pour-over flights, and warm neighborhood hospitality.',
  primaryColor = '#C86D51',
  isDark = false,
}) => {
  const [selectedLocId, setSelectedLocId] = useState<string>('loc_pearl');
  const [directionsNotice, setDirectionsNotice] = useState<string | null>(null);

  // B2B Wholesale Inquiry State
  const [wsName, setWsName] = useState<string>('');
  const [wsBusinessName, setWsBusinessName] = useState<string>('');
  const [wsEmail, setWsEmail] = useState<string>('');
  const [wsType, setWsType] = useState<string>('Café');
  const [wsVolume, setWsVolume] = useState<string>('25 – 50 lbs / week');
  const [wsSubmitted, setWsSubmitted] = useState<boolean>(false);
  const [wsError, setWsError] = useState<string | null>(null);

  const activeLocation =
    CAFE_LOCATIONS.find((l) => l.id === selectedLocId) || CAFE_LOCATIONS[0];

  const handleSubmitWholesale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wsName.trim() || !wsBusinessName.trim()) {
      setWsError('Please enter your name and business name.');
      return;
    }
    if (!wsEmail.includes('@') || !wsEmail.includes('.')) {
      setWsError('Please enter a valid business email address.');
      return;
    }
    setWsError(null);
    setWsSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* ================================================================= */}
      {/* SECTION E: STORE LOCATOR & HOURS (TWO-COLUMN SPLIT LAYOUT)        */}
      {/* ================================================================= */}
      <section
        id="coffee-locations"
        className={`py-20 px-6 border-t transition-colors ${
          isDark
            ? 'bg-[#221614] border-[#3D2314] text-[#FAF8F5]'
            : 'bg-[#F7F3E9] border-[#3D2314]/10 text-[#1B1212]'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium opacity-75">
              <MapPin size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                Store Locator &amp; Live Seating
              </span>
              <span aria-hidden="true">·</span>
              <span>3 Portland Neighborhood Cafes</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="coffee_loc_heading" defaultText={title} />
            </h2>

            <EditableText
              id="coffee_loc_sub"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base opacity-80 leading-relaxed block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Location Cards */}
            <div className="lg:col-span-6 space-y-4">
              {CAFE_LOCATIONS.map((loc) => {
                const isSelected = loc.id === selectedLocId;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocId(loc.id)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 ${
                      isSelected
                        ? isDark
                          ? 'bg-[#1B1212] border-[#C86D51]'
                          : 'bg-[#FAF8F5] border-[#C86D51] shadow-sm'
                        : isDark
                        ? 'bg-[#1B1212]/60 border-[#3D2314]'
                        : 'bg-[#FAF8F5]/70 border-[#3D2314]/12 hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                        <Clock size={13} />
                        <span>● {loc.status}</span>
                      </span>
                      <span className="font-mono tabular-nums opacity-70">
                        {loc.phone}
                      </span>
                    </div>

                    <div>
                      <h3
                        className="text-lg sm:text-xl font-semibold"
                        style={{
                          fontFamily:
                            "'Fraunces', 'Playfair Display', Georgia, serif",
                        }}
                      >
                        {loc.name}
                      </h3>
                      <p className="text-xs sm:text-sm opacity-75 mt-0.5">
                        {loc.address}
                      </p>
                    </div>

                    {/* Seating Capacity Indicator */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 opacity-80">
                          <Users size={13} style={{ color: primaryColor }} />
                          <span>{loc.seatingLabel}</span>
                        </span>
                        <span className="font-mono tabular-nums font-semibold">
                          {loc.seatingPct}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#3D2314]/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${loc.seatingPct}%`,
                            backgroundColor: primaryColor,
                          }}
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <span className="text-[11px] opacity-65">
                        {loc.transit}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLocId(loc.id);
                          setDirectionsNotice(
                            `Route loaded to ${loc.name} (${loc.address})`
                          );
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF8F5] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Navigation size={13} />
                        <span>Get Directions</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Side: Interactive Stylized Map with Clickable Pins */}
            <div className="lg:col-span-6 flex flex-col">
              <div
                className={`flex-1 rounded-3xl p-6 border flex flex-col justify-between space-y-4 ${
                  isDark
                    ? 'bg-[#1B1212] border-[#3D2314]'
                    : 'bg-[#FAF8F5] border-[#3D2314]/15'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-mono uppercase opacity-65">
                      Interactive Roastery Map · Portland, OR
                    </div>
                    <div className="text-base font-semibold mt-0.5">
                      {activeLocation.name}
                    </div>
                  </div>
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: primaryColor }}
                  >
                    Click any pin to inspect
                  </span>
                </div>

                {/* Stylized Architectural SVG Map */}
                <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#261816] border border-[#3D2314]">
                  <svg
                    viewBox="0 0 600 340"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    {/* Warm Map Background */}
                    <rect width="600" height="340" fill="#231715" />

                    {/* Willamette River Curve */}
                    <path
                      d="M 290,0 C 275,90 315,170 300,340"
                      fill="none"
                      stroke="#3D2314"
                      strokeWidth="38"
                    />
                    <path
                      d="M 290,0 C 275,90 315,170 300,340"
                      fill="none"
                      stroke="#C86D51"
                      strokeWidth="1.5"
                      strokeDasharray="4 6"
                      opacity="0.45"
                    />

                    {/* Street Grid Lines */}
                    {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((x) => (
                      <line
                        key={`vx_${x}`}
                        x1={x}
                        y1={0}
                        x2={x}
                        y2={340}
                        stroke="rgba(247,243,233,0.06)"
                        strokeWidth="1"
                      />
                    ))}
                    {[55, 110, 165, 220, 275].map((y) => (
                      <line
                        key={`hy_${y}`}
                        x1={0}
                        y1={y}
                        x2={600}
                        y2={y}
                        stroke="rgba(247,243,233,0.06)"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Major Arterial Roads */}
                    <path
                      d="M 0,145 L 600,145 M 210,0 L 210,340 M 0,230 L 600,230"
                      stroke="rgba(200,109,81,0.22)"
                      strokeWidth="3"
                    />

                    {/* Location Pins */}
                    {CAFE_LOCATIONS.map((loc) => {
                      const active = loc.id === selectedLocId;
                      return (
                        <g
                          key={loc.id}
                          onClick={() => setSelectedLocId(loc.id)}
                          className="cursor-pointer"
                        >
                          {active && (
                            <circle
                              cx={loc.coords.x}
                              cy={loc.coords.y}
                              r="26"
                              fill="rgba(200,109,81,0.25)"
                            />
                          )}
                          <circle
                            cx={loc.coords.x}
                            cy={loc.coords.y}
                            r={active ? '12' : '9'}
                            fill={active ? primaryColor : '#F7F3E9'}
                            stroke="#1B1212"
                            strokeWidth="3"
                          />
                          <text
                            x={loc.coords.x}
                            y={loc.coords.y - 18}
                            textAnchor="middle"
                            fill="#FAF8F5"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            {loc.name.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Map Overlay Info Card */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-[#1B1212]/90 backdrop-blur-xs border border-white/10 text-[#FAF8F5] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold">{activeLocation.name}</div>
                      <div className="text-[#F7F3E9]/75">
                        {activeLocation.address} · {activeLocation.phone}
                      </div>
                    </div>
                    <span
                      className="font-mono font-semibold"
                      style={{ color: primaryColor }}
                    >
                      {activeLocation.status}
                    </span>
                  </div>
                </div>

                {directionsNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                    ✓ {directionsNotice}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION F: B2B WHOLESALE INQUIRIES (DEEP ESPRESSO CONTRAST)       */}
      {/* ================================================================= */}
      <section
        id="coffee-wholesale"
        className="py-20 px-6 bg-[#1B1212] text-[#FAF8F5] border-t border-[#3D2314]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 6 Columns: Headline & 4 Value Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#F7F3E9]/75">
              <Award size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                B2B Roastery Wholesale Program
              </span>
              <span aria-hidden="true">·</span>
              <span>Cafés · Offices · Boutique Hotels</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText
                id="coffee_wholesale_heading"
                defaultText="Serve Velvet Bean at Your Cafe or Workspace."
              />
            </h2>

            <EditableText
              id="coffee_wholesale_sub"
              as="p"
              defaultText="Partner with our roastery for dialled-in espresso blends, single-origin pour-over lots, and hands-on technical support."
              className="text-sm sm:text-base text-[#F7F3E9]/80 leading-relaxed block"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  num: '01.',
                  title: 'Fresh Weekly Roasts',
                  desc: 'Roasted to order every Monday and Thursday with same-day local courier or UPS carbon-neutral freight.',
                },
                {
                  num: '02.',
                  title: 'Custom Blend Profiling',
                  desc: 'Work alongside our head roaster at the cupping table to craft a signature house espresso profile.',
                },
                {
                  num: '03.',
                  title: 'Complimentary Barista Training',
                  desc: 'Hands-on espresso extraction, milk texturing, and latte art workshops for your entire hospitality team.',
                },
                {
                  num: '04.',
                  title: 'Commercial Equipment Support',
                  desc: 'Preferred partner pricing and preventive calibration on La Marzocco, Victoria Arduino, and Mahlkönig grinders.',
                },
              ].map((pillar) => (
                <div
                  key={pillar.num}
                  className="p-5 rounded-2xl bg-[#261816] border border-[#3D2314] space-y-2"
                >
                  <div
                    className="text-xs font-mono font-semibold tabular-nums"
                    style={{ color: primaryColor }}
                  >
                    {pillar.num}
                  </div>
                  <h3 className="text-base font-semibold">{pillar.title}</h3>
                  <p className="text-xs text-[#F7F3E9]/75 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right 6 Columns: Validated B2B Wholesale Inquiry Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#261816] border border-[#3D2314]">
              {wsSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <CheckCircle2
                    size={36}
                    className="mx-auto"
                    style={{ color: primaryColor }}
                  />
                  <h3
                    className="text-2xl font-semibold"
                    style={{
                      fontFamily:
                        "'Fraunces', 'Playfair Display', Georgia, serif",
                    }}
                  >
                    Wholesale Sample Box Requested
                  </h3>
                  <p className="text-sm text-[#F7F3E9]/80 max-w-md mx-auto">
                    Thank you, <strong>{wsName}</strong>! Our Wholesale Director will contact{' '}
                    <strong>{wsBusinessName}</strong> ({wsEmail}) within 1 business day to dispatch your complimentary tasting kit for a{' '}
                    <strong>{wsType}</strong> ({wsVolume}).
                  </p>
                  <button
                    type="button"
                    onClick={() => setWsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#FAF8F5] cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitWholesale} className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase text-[#F7F3E9]/65">
                      Request Wholesale Pricing &amp; Sample Kit
                    </div>
                    <h3
                      className="text-xl font-semibold mt-0.5"
                      style={{
                        fontFamily:
                          "'Fraunces', 'Playfair Display', Georgia, serif",
                      }}
                    >
                      Tell Us About Your Program
                    </h3>
                  </div>

                  {wsError && (
                    <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-400/30 text-xs font-semibold text-rose-200">
                      {wsError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#F7F3E9]/90">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={wsName}
                        onChange={(e) => setWsName(e.target.value)}
                        placeholder="Clara Vance"
                        className="w-full px-4 py-3 rounded-xl bg-[#1B1212] border border-[#3D2314] text-xs sm:text-sm text-[#FAF8F5] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#F7F3E9]/90">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={wsBusinessName}
                        onChange={(e) => setWsBusinessName(e.target.value)}
                        placeholder="Alder & Pine Bakery"
                        className="w-full px-4 py-3 rounded-xl bg-[#1B1212] border border-[#3D2314] text-xs sm:text-sm text-[#FAF8F5] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#F7F3E9]/90">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={wsEmail}
                      onChange={(e) => setWsEmail(e.target.value)}
                      placeholder="clara@alderandpine.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#1B1212] border border-[#3D2314] text-xs sm:text-sm text-[#FAF8F5] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#F7F3E9]/90">
                        Business Type
                      </label>
                      <select
                        value={wsType}
                        onChange={(e) => setWsType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#1B1212] border border-[#3D2314] text-xs sm:text-sm text-[#FAF8F5] focus:outline-none"
                      >
                        <option value="Café">Café / Espresso Bar</option>
                        <option value="Office">Creative Office / Studio</option>
                        <option value="Hotel">Boutique Hotel</option>
                        <option value="Restaurant">Restaurant &amp; Bakery</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#F7F3E9]/90">
                        Estimated Weekly Volume
                      </label>
                      <select
                        value={wsVolume}
                        onChange={(e) => setWsVolume(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#1B1212] border border-[#3D2314] text-xs sm:text-sm text-[#FAF8F5] focus:outline-none"
                      >
                        <option value="10 – 25 lbs / week">10 – 25 lbs / week</option>
                        <option value="25 – 50 lbs / week">25 – 50 lbs / week</option>
                        <option value="50 – 120 lbs / week">50 – 120 lbs / week</option>
                        <option value="120+ lbs / week">120+ lbs / week</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-[#FAF8F5] inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-95 cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Send size={15} />
                    <span>Request Wholesale Sample Box &amp; Rate Sheet</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION G: BRAND STORY & SUSTAINABILITY                           */}
      {/* ================================================================= */}
      <section
        id="coffee-story"
        className={`py-20 px-6 border-t transition-colors ${
          isDark
            ? 'bg-[#1B1212] border-[#3D2314] text-[#FAF8F5]'
            : 'bg-[#FAF8F5] border-[#3D2314]/10 text-[#1B1212]'
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left 6 Columns: Documentary Roaster Visual */}
          <div className="lg:col-span-6">
            <div
              className={`rounded-3xl p-4 sm:p-5 border ${
                isDark
                  ? 'bg-[#261816] border-[#3D2314]'
                  : 'bg-[#F7F3E9] border-[#3D2314]/12'
              } space-y-4`}
            >
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#1B1212]">
                <EditableImage
                  id="coffee_story_roaster_img"
                  defaultSrc={velvetRoasteryStory}
                  alt="Head Roaster inspecting freshly roasted single-origin beans at Velvet Bean Roasters"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-xs px-1 opacity-80">
                <span>Head Roaster Mateo Alvarez · 1968 Cast-Iron Probat Drum</span>
                <span className="font-mono tabular-nums">Crop Year 2026</span>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Direct Trade, Compostable Packaging & Community */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium opacity-75">
              <Leaf size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                Our Story &amp; Sustainability Charter
              </span>
              <span aria-hidden="true">·</span>
              <span>Seed-to-Cup Transparency</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText
                id="coffee_story_heading"
                defaultText="100% Direct Trade Partnerships & Zero-Waste Roasting"
              />
            </h2>

            <EditableText
              id="coffee_story_para_1"
              as="p"
              defaultText="Founded in 2017 in a converted brick carriage house, Velvet Bean Roasters was built on a simple conviction: extraordinary coffee begins with long-term, equitable relationships at origin. Every harvest season, our roasting team travels directly to 42 smallholder family farms across Ethiopia, Colombia, Guatemala, and Peru."
              className="text-sm sm:text-base opacity-85 leading-relaxed block"
            />

            <EditableText
              id="coffee_story_para_2"
              as="p"
              defaultText="We pay an average of 38% above Fair Trade minimums directly to producers, roast on high-efficiency Loring & restored vintage cast-iron drums, and package every bag in 100% plant-based, backyard-compostable films with degassing valves. Every Saturday morning at 10 AM, we open our Pearl District cupping table for free community tastings."
              className="text-sm sm:text-base opacity-85 leading-relaxed block"
            />

            {/* Quantified Sustainability Metrics */}
            <div className="pt-4 border-t border-[#3D2314]/15 dark:border-[#3D2314] grid grid-cols-3 gap-6">
              <div>
                <div
                  className="text-2xl sm:text-3xl font-mono font-semibold tabular-nums"
                  style={{ color: primaryColor }}
                >
                  +38%
                </div>
                <div className="text-xs opacity-75 mt-1">
                  Paid Above Fair Trade Farm-Gate Minimum
                </div>
              </div>
              <div>
                <div
                  className="text-2xl sm:text-3xl font-mono font-semibold tabular-nums"
                  style={{ color: primaryColor }}
                >
                  100%
                </div>
                <div className="text-xs opacity-75 mt-1">
                  Compostable Plant-Based Coffee Bags
                </div>
              </div>
              <div>
                <div
                  className="text-2xl sm:text-3xl font-mono font-semibold tabular-nums"
                  style={{ color: primaryColor }}
                >
                  42 Farms
                </div>
                <div className="text-xs opacity-75 mt-1">
                  Multi-Year Direct Trade Producer Partners
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
