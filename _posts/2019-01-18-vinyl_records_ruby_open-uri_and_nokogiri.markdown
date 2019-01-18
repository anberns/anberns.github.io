---
layout: post
title:      "Vinyl records, Ruby, Open-uri, and Nokogiri"
date:       2019-01-18 18:32:11 -0500
permalink:  vinyl_records_ruby_open-uri_and_nokogiri
---


So there's this famous record store in Berlin called Hard Wax that specializes in techno and other electronic music genres and they have a webstore where you can listen to samples and buy music. A lot of the releases are vinyl only as vinyl has made a major resurgence, particularly among the dj and audiophile crowd. 

What does this have to do with Ruby? Well every week Hard Wax posts new releases in a variety of genres and subgenres. All of them can be heard by scrolling through the webstore and clicking on songs. And this method of finding new music is fine. It's worked for me for a long time. But wouldn't it be great to have the new releases come to you, sorted by genre and playable in a quasi-playlist where clicking is unnecessary?

Here's a link to the webstore:
[https://hardwax.com/this-week/](http://)

So what does this have to do with Ruby!? Well the combination of Ruby's Open-uri and Nokogiri Gems are all it takes to make this dream come true. Aside from some process management and Linux trickery, but more on that later. Open-uri requests and saves the html from Hard Wax's new release pages and Nokogiri parses that data so that each release can be saved in a virtual record crate object. Each create has many release objects and each release has several track objects.

Here's what a week's worth of atmospheric techno releases looks like post-scrape:

```
Narrative by Chptr on Chptr
-Occasional Burst
-A Bygone Era
-Incontrovertible Assurance
-Torrent Of Speculation
-The Reimaginings
-Far Beyond Instinct
-Gravitational Collapse
-Call It A Day


Akrasia by DJ Sports on Help
-Akrasia
-Akrasia (Subsidiary Mix)
-Akrasia (Central's Full Remix)


Not Your Hero by Joton on New Rhythmic
-Out Of The Smokeless Fire
-Not Your Hero
-The Light Above
```

The information is good to have but it would be really nice to hear the songs. Making this happen is not as difficult as it may seem (because of Google and Stack Overflow). It turns out that Open-uri can also download files and Ruby can fork and spawn new processes through it's fork{ } and fork { exec ... } commands found in it's Process module. There's also a Ruby module named FileUtils that helps save the file. Here's how they all fit together:


Open-uri downloads the sample audio file from the Hard Wax server via the sample url and FileUtils saves it with a file name we can use to play it.
Solution from [https://www.reddit.com/r/ruby/comments/6x4ev4/how_to_download_an_mp3_file/](http://)
```
tempfile = URI.parse(track.url).open
tempfile.close
FileUtils.mv tempfile.path, "audio.mp3"
```



fork { exec } hands over control to the OS's audio player, passing the newly downloaded file.
Solution from [https://stackoverflow.com/questions/9891297/how-do-i-play-mp3-file](http://)

Mac
```
pid = fork { exec 'afplay', "audio.mp3"}
```


Linux
```
pid = fork{ exec 'mpg123','-q', "audio.mp3" }
```



Throw a collection of release objects in a nested iterator and sit back as all the songs are played one after another.

```
crate.releases.each do |release|
        release.tracks.each do |track|
                puts "Playing-> #{release.name} - #{track.name}"
                
                 tempfile = URI.parse(track.url).open
                 tempfile.close
                 FileUtils.mv tempfile.path, "audio.mp3"
								 
                 pid = fork{ exec 'afplay', "audio.mp3"}
			 end
end                
```



Wait. They're all playing at the same time. We need to add one last thing. 

```
waitpid(pid, 0)
```
This will cause the execution of the program to stop and wait for the play command to finish and the process to end before continuing in the loop. Here's the full code snippet:

```
crate.releases.each do |release|
  release.tracks.each do |track|
    puts "Playing-> #{release.name} - #{track.name}"
                
    tempfile = URI.parse(track.url).open
    tempfile.close
    FileUtils.mv tempfile.path, "audio.mp3"
								 
    pid = fork{ exec 'afplay', "audio.mp3"}
    waitpid(pid, 0)
  end
end 
``` 



Now we can really sit back and let the techno come to us! 
For more information on Ruby's Process module check out 
[https://ruby-doc.org/core-2.2.0/Process.html](http://) 
and for FileUtils see 
[https://ruby-doc.org/stdlib-2.4.1/libdoc/fileutils/rdoc/FileUtils.html](http://).


