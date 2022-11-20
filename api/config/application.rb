require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    config.load_defaults 7.0

    config.log_level = :debug
    config.log_tags  = [:subdomain, :uuid]
    config.logger    = ActiveSupport::TaggedLogging.new(Logger.new(STDOUT))

    config.api_only = true

    config.cache_store = :redis_store, ENV['CACHE_URL'],
      { namespace: 'lensfer::cache' }

    config.active_job.queue_adapter = :sidekiq
  end
end
