<section class="jp-hero" id="hero">
    <!-- Warm radial tint -->
    <div class="jp-hero__tint" aria-hidden="true"></div>

    <!-- Desktop layout: 45/55 split -->
    <div class="jp-hero__desktop">
        <!-- Left column -->
        <div class="jp-hero__left">
            <!-- Eyebrow -->
            <div class="jp-hero__eyebrow fade-in" data-delay="0.05">
                <div class="jp-hero__eyebrow-line" aria-hidden="true"></div>
                <span class="jp-hero__eyebrow-text">Bauherrenvertretung &amp; Projektentwicklung, Basel</span>
            </div>

            <!-- Headline -->
            <h1 class="jp-hero__headline" aria-label="Bauen was bleibt. Basel.">
                <div class="jp-hero__line-wrap">
                    <div class="jp-hero__line fade-in-up" data-delay="0.15">Bauen was</div>
                </div>
                <div class="jp-hero__line-wrap">
                    <div class="jp-hero__line fade-in-up" data-delay="0.25">bleibt.</div>
                </div>
                <div class="jp-hero__line-wrap">
                    <div class="jp-hero__line fade-in-up" data-delay="0.35">Basel.</div>
                </div>
            </h1>

            <!-- Subline + CTAs -->
            <div class="jp-hero__sub fade-in" data-delay="0.6">
                <p class="jp-hero__desc">
                    Bauherrenvertretung, Projektentwicklung und Immobilienberatung
                    aus Basel. Mit den Wurzeln bei Herzog &amp; de Meuron.
                </p>
                <div class="jp-hero__ctas">
                    <a href="#kontakt" class="jp-btn jp-btn--primary">
                        Kontakt aufnehmen
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" stroke-width="1.4"/>
                        </svg>
                    </a>
                    <a href="#leistungen" class="jp-btn jp-btn--outline">
                        Leistungen
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" stroke-width="1.4"/>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Stats -->
            <div class="jp-hero__stats fade-in" data-delay="1.0">
                <div class="jp-hero__stat">
                    <span class="jp-hero__stat-value">Seit 2016</span>
                    <span class="jp-hero__stat-label">Erfahrung aufgebaut</span>
                </div>
                <div class="jp-hero__stat">
                    <span class="jp-hero__stat-value">H&amp;dM</span>
                    <span class="jp-hero__stat-label">Herkunft &amp; Netzwerk</span>
                </div>
                <div class="jp-hero__stat">
                    <span class="jp-hero__stat-value">Basel</span>
                    <span class="jp-hero__stat-label">Standort</span>
                </div>
            </div>
        </div>

        <!-- Right column: building visual -->
        <div class="jp-hero__right fade-in" data-delay="0.2">
            <div class="jp-hero__visual-wrap">
                <?php get_template_part('template-parts/alba-visual'); ?>
            </div>
        </div>
    </div>

    <!-- Mobile layout -->
    <div class="jp-hero__mobile">
        <div class="jp-hero__mobile-content">
            <div class="jp-hero__eyebrow fade-in" data-delay="0.05">
                <div class="jp-hero__eyebrow-line" aria-hidden="true"></div>
                <span class="jp-hero__eyebrow-text">Bauherrenvertretung, Basel</span>
            </div>
            <h1 class="jp-hero__headline jp-hero__headline--mobile" aria-label="Bauen was bleibt. Basel.">
                <div class="jp-hero__line-wrap">
                    <div class="jp-hero__line fade-in-up" data-delay="0.15">Bauen was</div>
                </div>
                <div class="jp-hero__line-wrap">
                    <div class="jp-hero__line fade-in-up" data-delay="0.25">bleibt.</div>
                </div>
                <div class="jp-hero__line-wrap">
                    <div class="jp-hero__line fade-in-up" data-delay="0.35">Basel.</div>
                </div>
            </h1>
            <div class="jp-hero__sub fade-in" data-delay="0.6">
                <p class="jp-hero__desc">
                    Bauherrenvertretung aus Basel. Mit den Wurzeln bei Herzog &amp; de Meuron.
                </p>
                <div class="jp-hero__ctas">
                    <a href="#kontakt" class="jp-btn jp-btn--primary">
                        Kontakt
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" stroke-width="1.4"/>
                        </svg>
                    </a>
                    <a href="#leistungen" class="jp-btn jp-btn--outline">
                        Leistungen
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                            <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" stroke-width="1.4"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        <!-- Mobile visual -->
        <div class="jp-hero__mobile-visual fade-in" data-delay="0.4">
            <?php get_template_part('template-parts/alba-visual'); ?>
        </div>
    </div>

    <!-- Scroll indicator -->
    <div class="jp-hero__scroll fade-in" data-delay="1.5" aria-hidden="true">
        <div class="jp-hero__scroll-line">
            <div class="jp-hero__scroll-dot"></div>
        </div>
        <span class="jp-hero__scroll-text">Scroll</span>
    </div>
</section>
