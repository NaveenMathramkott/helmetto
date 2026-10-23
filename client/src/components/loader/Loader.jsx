import "./style.css";

const Loader = () => {
  return (
    <div className="appLoading-container">
      <svg
        id="helmet-loader"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          id="helmet-g"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Helmet outline */}
          <path
            id="helmet-outline"
            className="animate-moveLine"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            d="
              M 200 40
              C 120 40, 60 100, 60 180
              C 60 260, 120 320, 200 340
              C 280 320, 340 260, 340 180
              C 340 100, 280 40, 200 40
              Z
              M 160 100
              C 160 85, 172 72, 188 72
              C 204 72, 216 85, 216 100
              C 216 115, 204 128, 188 128
              C 172 128, 160 115, 160 100
              Z
              M 200 128
              L 200 160
              M 180 160
              L 220 160
            "
          />

          {/* Visor */}
          <path
            id="helmet-visor"
            className="animate-moveLine"
            strokeDasharray="400"
            strokeDashoffset="400"
            d="
              M 170 140
              Q 200 120, 230 140
              Q 240 150, 230 160
              Q 200 170, 170 160
              Q 160 150, 170 140
              Z
            "
          />

          {/* Ventilation holes */}
          <circle
            id="vent-1"
            className="animate-moveLine"
            cx="140"
            cy="150"
            r="8"
            strokeDasharray="50"
            strokeDashoffset="50"
          />
          <circle
            id="vent-2"
            className="animate-moveLine"
            cx="200"
            cy="150"
            r="8"
            strokeDasharray="50"
            strokeDashoffset="50"
          />
          <circle
            id="vent-3"
            className="animate-moveLine"
            cx="260"
            cy="150"
            r="8"
            strokeDasharray="50"
            strokeDashoffset="50"
          />
        </g>
      </svg>
      <div className="loading-text">
        <span className="loading-brand">Helmetto</span>
        <span className="loading-subtitle">Loading your custom helmet...</span>
      </div>
    </div>
  );
};

export default Loader;
