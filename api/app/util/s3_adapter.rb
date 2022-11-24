class S3Adapter
  require 'aws-sdk-s3'

  MAX_EXPIRES_IN = 604800

  def initialize(s3_client)
    @client = s3_client
  end

  def self.client(
    access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_ACCESS_KEY_SECRET'],
    endpoint: ENV['AWS_ENDPOINT'],
    force_path_style: ENV['AWS_FORCE_PATH_STYLE'],
    region: ENV['AWS_REGION']
  )
    self.new Aws::S3::Client.new(
      access_key_id: access_key_id,
      secret_access_key: secret_access_key,
      endpoint: endpoint,
      force_path_style: force_path_style || false,
      region: region
    )
  end

  def presigned_request(key, method, expires_in: 900, time: Time.now, secure: false)
    raise ArgumentError('Invalid method') unless method.in?([:put_object, :get_object])
    raise ArgumentError('expires_in cannot be greater than ') if expires_in > MAX_EXPIRES_IN

    url,headers = Rails.cache.fetch(key + '/' + method.to_s, expires_in: expires_in.seconds) do
      puts "Cache missing"
      Aws::S3::Presigner.new(client: @client).
        presigned_url(
          method,
          bucket: ENV['AWS_BUCKET'],
          key: key,

          time: time,
          expires_in: expires_in,
          secure: secure
        )
    end

    {
      url: url,
      headers: headers,
      exp: (time + expires_in).to_i,
      exp_in: expires_in
    }
  end

end
