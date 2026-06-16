<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="jp-nav" id="jp-header">
    <div class="jp-nav__inner">
        <!-- Logo -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="jp-nav__logo">
            <div class="jp-nav__logo-mark">
                <span>JP</span>
            </div>
            <div class="jp-nav__logo-text">
                <span class="jp-nav__logo-name">JP DL AG</span>
                <span class="jp-nav__logo-sub">Real Estate</span>
            </div>
        </a>

        <!-- Desktop nav -->
        <nav class="jp-nav__links" aria-label="Hauptnavigation">
            <a href="#leistungen" class="jp-nav__link">Leistungen</a>
            <a href="#alba" class="jp-nav__link">Projekte</a>
            <a href="#ueber-uns" class="jp-nav__link">Über uns</a>
            <a href="#kontakt" class="jp-nav__link">Kontakt</a>
            <a href="#kontakt" class="jp-nav__cta">Kontakt aufnehmen</a>
        </nav>

        <!-- Mobile hamburger -->
        <button class="jp-nav__hamburger" id="jp-hamburger" aria-label="Menü öffnen" aria-expanded="false">
            <span class="jp-nav__bar jp-nav__bar--top"></span>
            <span class="jp-nav__bar jp-nav__bar--mid"></span>
            <span class="jp-nav__bar jp-nav__bar--bot"></span>
        </button>
    </div>

    <!-- Mobile menu -->
    <div class="jp-nav__mobile" id="jp-mobile-menu" aria-hidden="true">
        <div class="jp-nav__mobile-inner">
            <a href="#leistungen" class="jp-nav__mobile-link">Leistungen</a>
            <a href="#alba" class="jp-nav__mobile-link">Projekte</a>
            <a href="#ueber-uns" class="jp-nav__mobile-link">Über uns</a>
            <a href="#kontakt" class="jp-nav__mobile-link">Kontakt</a>
            <a href="#kontakt" class="jp-nav__cta jp-nav__mobile-cta">Kontakt aufnehmen</a>
        </div>
    </div>
</header>
