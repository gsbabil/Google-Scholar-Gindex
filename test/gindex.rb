#!/usr/bin/env ruby

MyCitations = IO.read(ARGV[0])

# The RE was initially />(\d+)<\/a>// however, it also got suprious entry from,
# at least, publication titles ending in numbers; causing no output to be
# printed, probably as '$citations < ($gindex*$gindex)' was then false
# This new RE looks for a link with *only* numbers.
# XXX: Googcle Scholars has some starred entries. Are they properly captured?
# omehani, 2013-01-09
records = MyCitations.scan(/<a[^>]*>(\d+)<\/a>/).flatten.collect {|i| i.to_i}.sort {|a,b| b <=> a}

$gindex = 0
$hindex = 0
$citations = 0

for i in records
  $gindex +=1
  $citations = $citations + i
  if $hindex == 0 and i <  $gindex
    $hindex = $gindex - 1
  end
  if $citations < ($gindex*$gindex)
    puts "Your g-index is: #{$gindex-1}"
    puts "Your h-index is: #{$hindex}"
    break
  end
end
