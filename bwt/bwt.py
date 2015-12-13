


def encode(s):
    shifts = []
    for i in range(len(s)):
        shifts.append(s[i:] + s[:i])
    shifts.sort()
    encoded = ''.join(shifted[-1] for shifted in shifts)
    return encoded, shifts.index(s)


def decode(s, indx):
    table = ['' for ch in s]
    for _ch in s:
        for k in range(len(table)):
            table[k] = s[k] + table[k]
        table.sort()
    return table[indx]


if __name__ == '__main__':
    source = input().strip()

    encoded = encode(source)
    print('encoded:', encoded)

    print('decoded:', decode(*encoded))
