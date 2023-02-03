web: yarn install --check-files && rails action_text:install && bin/rails server -p ${PORT:-5000} -e $RAILS_ENV
clock:  node clock.js
worker: bundle exec sidekiq -C config/sidekiq.yml
