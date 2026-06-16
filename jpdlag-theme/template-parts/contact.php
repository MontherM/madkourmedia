<section id="kontakt" class="jp-contact jp-section jp-section--surface jp-contact--border">
    <div class="jp-container">
        <div class="jp-contact__grid">

            <!-- Left: info -->
            <div class="jp-contact__left">
                <div class="jp-fade-in">
                    <span class="jp-eyebrow">Kontakt</span>
                    <h2 class="jp-contact__headline jp-headline">
                        Starten Sie<br>
                        Ihr nächstes<br>
                        <span style="color:#1B2D1E;">Projekt.</span>
                    </h2>
                </div>

                <p class="jp-contact__intro jp-fade-in" data-delay="0.1">
                    J P DL freut sich auf den Kontakt mit Ihnen. Schildern Sie
                    uns Ihr Vorhaben.
                </p>

                <div class="jp-contact__details jp-fade-in" data-delay="0.15">
                    <a href="mailto:info@jpdlag.ch" class="jp-contact__detail-link">
                        <div class="jp-contact__detail-icon" aria-hidden="true">
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                <rect x="0.5" y="0.5" width="11" height="9" rx="0.5" stroke="#909090" stroke-width="0.75"/>
                                <path d="M0.5 1.5L6 5.5L11.5 1.5" stroke="#909090" stroke-width="0.75"/>
                            </svg>
                        </div>
                        <span>info@jpdlag.ch</span>
                    </a>

                    <a href="tel:+41615014490" class="jp-contact__detail-link">
                        <div class="jp-contact__detail-icon" aria-hidden="true">
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                <path d="M1 1.5C1 1.5 2.5 1 3 2.5L3.5 4C3.5 4 3.5 4.5 3 5L2.5 5.5C2.5 5.5 3.5 8 6.5 9L7 8.5C7 8.5 7.5 8 8 8L9.5 8.5C11 9 10.5 10.5 10.5 10.5C10.5 10.5 9.5 11 8 10C4 8 1 4 1 1.5Z" stroke="#909090" stroke-width="0.75" fill="none"/>
                            </svg>
                        </div>
                        <span>+41 61 501 44 90</span>
                    </a>

                    <div class="jp-contact__detail-link jp-contact__detail-link--static">
                        <div class="jp-contact__detail-icon" aria-hidden="true">
                            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                                <path d="M4 0C1.8 0 0 1.8 0 4C0 7 4 12 4 12C4 12 8 7 8 4C8 1.8 6.2 0 4 0ZM4 5.5C3.17 5.5 2.5 4.83 2.5 4C2.5 3.17 3.17 2.5 4 2.5C4.83 2.5 5.5 3.17 5.5 4C5.5 4.83 4.83 5.5 4 5.5Z" fill="#909090"/>
                            </svg>
                        </div>
                        <span>St. Jakobs-Strasse 54, 4052 Basel</span>
                    </div>
                </div>
            </div>

            <!-- Right: form -->
            <div class="jp-contact__right jp-fade-in" data-delay="0.08">
                <?php
                // Use CF7 if available, otherwise render native form
                if (function_exists('wpcf7_contact_form')) :
                    echo do_shortcode('[contact-form-7 id="contact-form" title="Kontakt JP DL AG"]');
                else :
                ?>
                <form class="jp-contact__form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <input type="hidden" name="action" value="jpdlag_contact">
                    <?php wp_nonce_field('jpdlag_contact_nonce', 'jpdlag_nonce'); ?>

                    <!-- Name row -->
                    <div class="jp-contact__row">
                        <div class="jp-contact__field">
                            <label class="jp-contact__label" for="jp-firstname">Vorname</label>
                            <input type="text" id="jp-firstname" name="firstname" placeholder="Max" required class="jp-contact__input">
                        </div>
                        <div class="jp-contact__field">
                            <label class="jp-contact__label" for="jp-lastname">Nachname</label>
                            <input type="text" id="jp-lastname" name="lastname" placeholder="Muster" class="jp-contact__input">
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="jp-contact__field">
                        <label class="jp-contact__label" for="jp-email">E-Mail *</label>
                        <input type="email" id="jp-email" name="email" placeholder="max@beispiel.ch" required class="jp-contact__input">
                    </div>

                    <!-- Topic -->
                    <div class="jp-contact__field">
                        <label class="jp-contact__label">Thema</label>
                        <div class="jp-contact__topics">
                            <label class="jp-topic"><input type="radio" name="topic" value="Projektentwicklung"> Projektentwicklung</label>
                            <label class="jp-topic"><input type="radio" name="topic" value="Immobilienberatung"> Immobilienberatung</label>
                            <label class="jp-topic"><input type="radio" name="topic" value="Standortanalyse"> Standortanalyse</label>
                            <label class="jp-topic"><input type="radio" name="topic" value="Baumanagement"> Baumanagement</label>
                            <label class="jp-topic"><input type="radio" name="topic" value="Allgemeine Anfrage"> Allgemeine Anfrage</label>
                        </div>
                    </div>

                    <!-- Message -->
                    <div class="jp-contact__field">
                        <label class="jp-contact__label" for="jp-message">Ihre Nachricht</label>
                        <textarea id="jp-message" name="message" rows="4" placeholder="Beschreiben Sie Ihr Vorhaben..." class="jp-contact__input jp-contact__textarea"></textarea>
                    </div>

                    <!-- Submit -->
                    <div class="jp-contact__submit">
                        <button type="submit" class="jp-btn jp-btn--primary">
                            Anfrage senden
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                                <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" stroke-width="1.4"/>
                            </svg>
                        </button>
                        <span class="jp-contact__note">Antwort in &lt; 24h</span>
                    </div>
                </form>
                <?php endif; ?>
            </div>

        </div>
    </div>
</section>
