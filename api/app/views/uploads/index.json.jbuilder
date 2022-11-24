json.items @uploads do |upload|
  json.partial! 'uploads/upload', locals: { upload: upload }
end
