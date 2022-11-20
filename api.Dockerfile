# Dockerfile development version
FROM ruby:3.1.2 AS lensfer-development

# Default directory
ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH

# Install gems
WORKDIR $INSTALL_PATH
COPY api/ .
RUN gem install rails bundler
RUN bundle install

# Start server
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]