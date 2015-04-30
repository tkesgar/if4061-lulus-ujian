# python kotor untuk generate heat.less

print "/* Digenerate oleh generate-heat-less.py */"

# analisis
for i in range(1, 5):
	print ".heat-{}00 {{ .heat-single(@ca{}); }}".format(i, i)

# campuran
for i in range(1, 5):
	print ".heat-0{}0 {{ .heat-single(@cc{}); }}".format(i, i)

# teori
for i in range(1, 5):
	print ".heat-00{} {{ .heat-single(@ct{}); }}".format(i, i)
	
# analisis + campuran
for i in range(1, 5):
	for j in range(1, 5):
		print ".heat-{}{}0 {{ .heat-dual(@ca{}, @cc{}); }}".format(i, j, i, j)
		if (i != j):
			print ".heat-{}{}0 {{ .heat-dual(@cc{}, @ca{}); }}".format(j, i, j, i)

# analisis + teori
for i in range(1, 5):
	for j in range(1, 5):
		print ".heat-{}0{} {{ .heat-dual(@ca{}, @ct{}); }}".format(i, j, i, j)
		if (i != j):
			print ".heat-{}0{} {{ .heat-dual(@ct{}, @ca{}); }}".format(j, i, j, i)
		
# campuran + teori
for i in range(1, 5):
	for j in range(1, 5):
		print ".heat-0{}{} {{ .heat-dual(@cc{}, @ct{}); }}".format(i, j, i, j)
		if (i != j):
			print ".heat-0{}{} {{ .heat-dual(@ct{}, @cc{}); }}".format(j, i, j, i)