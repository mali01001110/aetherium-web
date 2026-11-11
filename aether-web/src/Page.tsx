import { useEffect } from "react"
import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./Page.module.css"
import "./theme.css"
import "./reveal.css"
import "./heroFade.css"
import "./fadeSection.css"
import { initReveal } from "./reveal"
import { initHeroFade } from "./heroFade"
import { initFadeSection } from "./fadeSection"

export default function Page() {
  useEffect(() => {
    const cleanupReveal = initReveal()
    const cleanupFade = initHeroFade()
    const cleanupFadeSection = initFadeSection()
    return () => {
      cleanupReveal()
      cleanupFade()
      cleanupFadeSection()
    }
  }, [])

  return (
    <div className={styles["desktop"]}>
      <div className={styles["persistent-blue-hypergiant"]}>
        <div className={styles["distant-stars"]} />
        <div className={styles["blue-corona"]} />
        <div className={styles["aetherium-blue-star"]} />
        <div className={styles["cover-readability-gradient"]} />
      </div>
      <div className={styles["celestial-journey"]}>
        <div className={styles["aetherium-the-blue-heart"]} data-reveal="" id="top">
          <header className={styles["hero-header"]}>
            <a className={styles["hero-brand"]} href="#top" aria-label="Aetherium home">
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
              </svg>
              <span>AETHERIUM</span>
            </a>
            <nav className={styles["hero-nav"]} aria-label="Primary navigation">
              <a href="#system">THE SYSTEM</a>
            </nav>
            <p className={styles["signal-status"]}>
              <span aria-hidden="true" />
              SIGNAL FOUND
            </p>
          </header>
          <div className={styles["cover-content"]} data-hero-fade="">
            <div className={styles["expedition-coordinates"]}>
              <p className={cx(tokens["text-telemetry"], styles["expedition-label"])}>{"AN ATLAS BEYOND THE FAMILIAR"}</p>
              <p className={cx(tokens["text-telemetry"], styles["sector-coordinate"])}>{"SECTOR 07.21 / CYGNUS ARM"}</p>
            </div>
            <h1 className={styles["aetherium"]}>{"AETHERIUM"}</h1>
            <div className={styles["stellar-breathing-space"]} />
            <div className={styles["journey-introduction"]}>
              <div className={styles["the-blue-heart-introduction"]}>
                <h2 className={cx(tokens["text-cover-statement"], styles["the-blue-heart"])}>{"Every world begins with a little light."}</h2>
                <p className={cx(tokens["text-field-notes"], styles["system-introduction"])}>{"One blue hypergiant. Three extraordinary planets. One silent moon. A journey through a system that exists only beyond imagination."}</p>
                <a className={styles["begin-the-journey"]} href="#system">
                  <p className={cx(tokens["text-telemetry"], styles["explore-the-system"])}>{"SCROLL TO EXPLORE"}</p>
                  <svg aria-hidden="true" viewBox="0 0 20 20">
                    <path d="M10 3v13m-5-5 5 5 5-5" />
                  </svg>
                </a>
              </div>
              <div className={styles["blue-hypergiant-annotation"]}>
                <div className={styles["stellar-leader-line"]} aria-hidden="true">
                  <svg width="132" height="12" viewBox="0 0 132 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="6" x2="122" y2="6" stroke="rgba(244,250,255,0.65)" stroke-width="1" />
                    <path d="M122 6 L114 2 L122 6 L114 10 Z" fill="rgba(244,250,255,0.65)" />
                  </svg>
                </div>
                <p className={cx(tokens["text-telemetry"], styles["star-designation"])}>{"AETHERIUM"}</p>
                <p className={cx(tokens["text-micro-telemetry"], styles["star-classification"])}>{"BLUE HYPERGIANT / B0 Ia+"}</p>
              </div>
            </div>
            <div className={styles["cover-index"]}>
              <p className={cx(tokens["text-micro-telemetry"], styles["system-body-count"])}>{"01 STAR   /   03 PLANETS   /   01 MOON"}</p>
              <p className={cx(tokens["text-micro-telemetry"], styles["fictional-universe-note"])}>{"A FICTIONAL UNIVERSE. A REAL SENSE OF WONDER."}</p>
            </div>
          </div>
          <div className={styles["star-status-badge"]} aria-label="Aetherium, primary star">
            <span className={styles["star-status-orb"]} aria-hidden="true" />
            <span>AETHERIUM / PRIMARY STAR</span>
          </div>
        </div>
        <div className={styles["n-01-fabre"]} data-reveal="" id="system">
          <div className={styles["fabre-chapter-layout"]}>
            <div className={styles["fabre-chapter-index"]}>
              <p className={cx(tokens["text-telemetry"], styles["fabre-object-number"])}>{"01 / OCEAN WORLD"}</p>
              <p className={cx(tokens["text-telemetry"], styles["fabre-orbital-classification"])}>{"AETHERIUM B / INNER SYSTEM"}</p>
            </div>
            <div className={styles["text"]}>
              <div className={styles["fabre-field-notes"]} data-fade-section="">
                <h2 className={cx(tokens["text-planet-display"], styles["fabre"])}>{"Fabre"}</h2>
                <h3 className={cx(tokens["text-cover-statement"], styles["fabre-statement"])}>{"Where the ocean learned to glow."}</h3>
                <p className={cx(tokens["text-field-notes"], styles["fabre-description"])}>{"An endless cobalt sea, threaded with living light. Beneath Fabre’s pearl-white storms, luminous reef forests follow the slow pulse of Aetherium across the water."}</p>
                <div className={styles["fabre-observation"]}>
                  {/* TODO: external Framer module "Plus" — reimplement or swap for an npm equivalent */}
                  <p className={cx(tokens["text-observation-note"], styles["fabre-observation-note"])}>{"At night, the shoreline becomes a constellation of its own."}</p>
                </div>
              </div>
              <div className={styles["fabre-orbital-scene"]}>
                <div className={styles["fabre-orbital-ellipse"]} />
                <div className={styles["fabre-globe"]} />
                <div className={styles["fabre-white-arrow-label"]}>
                  <p className={cx(tokens["text-telemetry"], styles["fabre-celestial-label"])}>{"FABRE / 01"}</p>
                  <div className={styles["fabre-thin-white-leader"]}>
                    {/* TODO: external Framer module "Arrow Right" — reimplement or swap for an npm equivalent */}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["fabre-telemetry"]} data-fade-section="">
              <div className={styles["orbital-period-measurement"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["orbital-period"])}>{"ORBITAL PERIOD"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["orbital-period-value"])}>{"186 days"}</p>
              </div>
              <div className={styles["mean-temperature-measurement"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["mean-temperature"])}>{"MEAN TEMPERATURE"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["mean-temperature-value"])}>{"18°C"}</p>
              </div>
              <div className={styles["distance-to-star-measurement"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["distance-to-star"])}>{"DISTANCE TO STAR"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["distance-to-star-value"])}>{"2.4 AU"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["n-02-jaunes"]} data-reveal="">
          <div className={styles["jaunes-chapter-layout"]}>
            <div className={styles["jaunes-chapter-index"]}>
              <p className={cx(tokens["text-telemetry"], styles["jaunes-object-number"])}>{"02 / GAS GIANT"}</p>
              <p className={cx(tokens["text-telemetry"], styles["jaunes-orbital-classification"])}>{"AETHERIUM C / MIDDLE SYSTEM"}</p>
            </div>
            <div className={styles["text2"]}>
              <div className={styles["jaunes-orbital-scene"]}>
                <div className={styles["jaunes-orbital-ellipse"]} />
                <div className={styles["jaunes-globe"]} />
                <div className={styles["jaunes-white-arrow-label"]}>
                  <p className={cx(tokens["text-telemetry"], styles["jaunes-celestial-label"])}>{"JAUNES / 02"}</p>
                  <div className={styles["jaunes-thin-white-leader"]}>
                    {/* TODO: external Framer module "Arrow Right" — reimplement or swap for an npm equivalent */}
                  </div>
                </div>
              </div>
              <div className={styles["jaunes-field-notes"]} data-fade-section="">
                <h2 className={cx(tokens["text-planet-display"], styles["jaunes"])}>{"Jaunes"}</h2>
                <h3 className={cx(tokens["text-cover-statement"], styles["jaunes-statement"])}>{"A world without a still moment."}</h3>
                <p className={cx(tokens["text-field-notes"], styles["jaunes-description"])}>{"Teal cloud rivers circle a world with no solid shore. On Jaunes, a single storm can outlive a civilisation, turning beneath rings of suspended ice and mineral dust."}</p>
                <div className={styles["jaunes-observation"]}>
                  {/* TODO: external Framer module "Plus" — reimplement or swap for an npm equivalent */}
                  <p className={cx(tokens["text-observation-note"], styles["jaunes-observation-note"])}>{"The Great Spiral has been turning for 9,000 years."}</p>
                </div>
              </div>
            </div>
            <div className={styles["jaunes-telemetry"]} data-fade-section="">
              <div className={styles["orbital-period-measurement2"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["orbital-period2"])}>{"ORBITAL PERIOD"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["orbital-period-value2"])}>{"1,240 days"}</p>
              </div>
              <div className={styles["wind-velocity-measurement"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["wind-velocity"])}>{"WIND VELOCITY"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["wind-velocity-value"])}>{"1,800 km/h"}</p>
              </div>
              <div className={styles["distance-to-star-measurement2"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["distance-to-star2"])}>{"DISTANCE TO STAR"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["distance-to-star-value2"])}>{"5.8 AU"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["n-03-devis"]} data-reveal="">
          <div className={styles["devis-chapter-layout"]}>
            <div className={styles["devis-chapter-index"]}>
              <p className={cx(tokens["text-telemetry"], styles["devis-object-number"])}>{"03 / ICE WORLD"}</p>
              <p className={cx(tokens["text-telemetry"], styles["devis-orbital-classification"])}>{"AETHERIUM D / OUTER SYSTEM"}</p>
            </div>
            <div className={styles["text3"]}>
              <div className={styles["devis-field-notes"]} data-fade-section="">
                <h2 className={cx(tokens["text-planet-display"], styles["devis"])}>{"Devis"}</h2>
                <h3 className={cx(tokens["text-cover-statement"], styles["devis-statement"])}>{"Silence, written in ice."}</h3>
                <p className={cx(tokens["text-field-notes"], styles["devis-description"])}>{"At the edge of the blue light lies Devis, a pale archive of the system’s first winter. Vast crystalline plains conceal a dark, warm ocean beneath forty kilometres of ice."}</p>
                <div className={styles["devis-observation"]}>
                  {/* TODO: external Framer module "Plus" — reimplement or swap for an npm equivalent */}
                  <p className={cx(tokens["text-observation-note"], styles["devis-observation-note"])}>{"A frozen surface. An unexpected world underneath."}</p>
                </div>
              </div>
              <div className={styles["devis-orbital-scene"]}>
                <div className={styles["devis-orbital-ellipse"]} />
                <div className={styles["devis-globe"]} />
                <div className={styles["devis-white-arrow-label"]}>
                  <p className={cx(tokens["text-telemetry"], styles["devis-celestial-label"])}>{"DEVIS / 03"}</p>
                  <div className={styles["devis-thin-white-leader"]}>
                    {/* TODO: external Framer module "Arrow Right" — reimplement or swap for an npm equivalent */}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["devis-telemetry"]} data-fade-section="">
              <div className={styles["orbital-period-measurement3"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["orbital-period3"])}>{"ORBITAL PERIOD"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["orbital-period-value3"])}>{"3,860 days"}</p>
              </div>
              <div className={styles["surface-temperature-measurement"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["surface-temperature"])}>{"SURFACE TEMPERATURE"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["surface-temperature-value"])}>{"−168°C"}</p>
              </div>
              <div className={styles["distance-to-star-measurement3"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["distance-to-star3"])}>{"DISTANCE TO STAR"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["distance-to-star-value3"])}>{"11.2 AU"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["n-04-indy"]} data-reveal="">
          <div className={styles["indy-chapter-layout"]}>
            <div className={styles["indy-chapter-index"]}>
              <p className={cx(tokens["text-telemetry"], styles["indy-object-number"])}>{"04 / MOON OF DEVIS"}</p>
              <p className={cx(tokens["text-telemetry"], styles["indy-orbital-classification"])}>{"SATELLITE / OUTER SYSTEM"}</p>
            </div>
            <div className={styles["text4"]}>
              <div className={styles["indy-field-notes"]} data-fade-section="">
                <h2 className={cx(tokens["text-planet-display"], styles["indy"])}>{"Indy"}</h2>
                <h3 className={cx(tokens["text-cover-statement"], styles["indy-statement"])}>{"Small world. Endless wonder."}</h3>
                <p className={cx(tokens["text-field-notes"], styles["indy-description"])}>{"Indy keeps a quiet watch over Devis. Silver impact basins hold ancient blue ice, and its slow, synchronised orbit always offers the same scarred face to the planet it calls home."}</p>
                <div className={styles["indy-observation"]}>
                  {/* TODO: external Framer module "Plus" — reimplement or swap for an npm equivalent */}
                  <p className={cx(tokens["text-observation-note"], styles["indy-observation-note"])}>{"The smallest world in our atlas. The oldest stories."}</p>
                </div>
              </div>
              <div className={styles["indy-orbital-scene"]}>
                <div className={styles["indy-orbital-ellipse"]} />
                <div className={styles["indy-globe"]} />
                <div className={styles["indy-white-arrow-label"]}>
                  <p className={cx(tokens["text-telemetry"], styles["indy-celestial-label"])}>{"INDY / D–I"}</p>
                  <div className={styles["indy-thin-white-leader"]}>
                    {/* TODO: external Framer module "Arrow Right" — reimplement or swap for an npm equivalent */}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["indy-telemetry"]} data-fade-section="">
              <div className={styles["orbital-period-measurement4"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["orbital-period4"])}>{"ORBITAL PERIOD"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["orbital-period-value4"])}>{"27.6 days"}</p>
              </div>
              <div className={styles["mean-radius-measurement"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["mean-radius"])}>{"MEAN RADIUS"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["mean-radius-value"])}>{"1,420 km"}</p>
              </div>
              <div className={styles["parent-planet-measurement"]}>
                <p className={cx(tokens["text-micro-telemetry"], styles["parent-planet"])}>{"PARENT PLANET"}</p>
                <p className={cx(tokens["text-orbital-value"], styles["parent-planet-value"])}>{"Devis"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["n-05-orbital-atlas"]} data-reveal="" id="orbital-atlas">
          {/* TODO: external Framer module "OrbitalAtlas" — reimplement or swap for an npm equivalent */}
        </div>
        <footer className={styles["footer"]} data-reveal="">
          <div className={styles["footer-top"]}>
            <h2 className={cx(tokens["text-cover-statement"], styles["footer-headline"])}>AETHERIUM</h2>
            <a href="#top" className={styles["footer-cta"]}>BACK TO THE STAR</a>
          </div>
          <div className={styles["footer-bottom"]}>
            <p className={cx(tokens["text-micro-telemetry"], styles["footer-copyright"])}>© AETHERIUM</p>
            <a href="#top" className={styles["footer-transmission"]}>END OF TRANSMISSION</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

