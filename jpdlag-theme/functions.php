<?php
function jpdlag_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','comment-form','comment-list','gallery','caption']);
    register_nav_menus(['primary' => 'Hauptnavigation', 'footer' => 'Footer Navigation']);
}
add_action('after_setup_theme', 'jpdlag_setup');

function jpdlag_scripts() {
    wp_enqueue_style('dm-sans', 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap', [], null);
    wp_enqueue_style('jpdlag-main', get_template_directory_uri() . '/assets/css/main.css', [], '1.0.0');
    wp_enqueue_style('jpdlag-style', get_stylesheet_uri(), ['jpdlag-main'], '1.0.0');
    wp_enqueue_script('jpdlag-main', get_template_directory_uri() . '/assets/js/main.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'jpdlag_scripts');
