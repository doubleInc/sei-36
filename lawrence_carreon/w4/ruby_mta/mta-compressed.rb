require "colorize"; stations = { "N" => ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"],"L" => ["8th", "6th", "Union Square", "3rd", "1st"],"6" => ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor Place"]}; loop { puts "Welcome to MTA!".light_green; puts "Which line are you starting at?".light_blue; start_line = gets.chomp.upcase; puts "Which station are you starting at?".light_blue; start_station = gets.chomp; puts "Which line are you departing at?".light_blue; end_line = gets.chomp.upcase; puts "Which station are you departing at?".light_blue; end_station = gets.chomp; if start_station == end_station && start_line == end_line; puts "You are already at #{start_station}".red; next; end; puts "Travel on the #{start_line} line for the following stops: ".green; stops = ((stations[start_line].index start_station) < stations[start_line].index("Union Square") ? [stations[start_line][((stations[start_line].index start_station) + 1)..(stations[start_line].index("Union Square"))]] : [stations[start_line][(stations[start_line].index start_station)..(stations[start_line].index("Union Square") - 1)].reverse]); stops.push(["Change at Union Square and continue along the #{end_line}: ".light_magenta]) if start_line != end_line && end_station != "Union Square"; puts stops.push(end_station == "Union Square" ? [" "] : ((stations[end_line].index end_station) < stations[end_line].index("Union Square") ? [stations[end_line][(stations[end_line].index end_station)..(stations[end_line].index("Union Square") - 1)].reverse] : [stations[end_line][(stations[end_line].index("Union Square") + 1)..(stations[end_line].index end_station)]])).flatten!; puts "Arrive at #{end_station} on the #{end_line} line".green; puts "Total stops: #{start_line == end_line ? stops.size : (stops.size - 1)}".green; puts "Thank you for using MTA! #{("-=" * 40)}".blue }
