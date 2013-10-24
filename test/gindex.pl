#!/usr/bin/perl -w
undef $/;

@entries = split(m#</tr> <tr#,<>);
$g=0; $h=0; $i=0; $j=0; $citations=0;
foreach $entry (@entries) {
 unless ($entry =~ m#class="cit-dark-large-link">([^<]*)</a>#g) {next};
# $papertitle=$1;
 if ($entry =~ m#Citations grouped with another article#) {next};
 if ($ARGV[0] && $entry =~ m#<td id="col-year">(\d\d\d\d)</td># && $1 < $ARGV[0]) {next};
 if ($entry =~ m#href="http://scholar.google.[.a-z]*/scholar[^>]*>(\d*)</a>#) {
  $count=$1;
  $j++;
 } else {
  $count=0;
 };
 $citations=$citations+$count;
 $i++;
 if ($citations >= $i*$i) {$g=$i};
 if ($count >= $i) {$h=$i};
# print "$count\t$papertitle\n";
};
print "Total number of listed papers:\t$i\n";
print "Total number of cited papers:\t$j\n";
print "Total number of citations:\t$citations\n";
print "g-index:\t\t\t$g\n";
print "h-index:\t\t\t$h\n";
