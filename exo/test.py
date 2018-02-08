# -*- coding: utf-8; -*-

def get_occ(c, str_long):
    occ = 0
    for s in str_long:
        if s == c:
            occ += 1
    return occ


def get_occ2(c, str_long):
    return len( [s for s in str_long if s == c] )


def reverse_str(str_long):
    result = ""
    for s in str_long:
        result = s + result

    return result


def reverse_str2(str_long):
    len_str = len(str_long)

    result = ""
    i = 0
    while (i < len_str):
        s = str_long[i]

        result = s + result
        i += 1

    return result


def reverse_str3(str_long):
    last_i = len(str_long) - 1
    result = ""
    while last_i >= 0:
        result += str_long[last_i]
        last_i -= 1
    return result


def naive_sort(un_list):

    while True:
        sorted_ = True
        for i in range(len(un_list) - 1):
            if un_list[i + 1] < un_list[i]:
                un_list[i], un_list[i + 1] = un_list[i + 1], un_list[i]
                sorted_ = False
        if sorted_:
            break


def naive_sort2(un_list):
    sorted_list = [None] * len(un_list)
    for i in range(len(un_list)):
        min_e = un_list[i]
        for j in range(i + 1, len(un_list)):
            if min_e >= un_list[j]:
                min_e = un_list[j]
        sorted_list[i] = min_e
    return sorted_list




def quick_s(un_list):

    if len(un_list) > 1:
        pivot_index = int(len(un_list) / 2)

        middle = un_list[pivot_index]

        upper = []
        lower = []

        for i, e in enumerate(un_list):

            if i != pivot_index:
                if e > middle:
                    upper.append(e)
                if e < middle:
                    lower.append(e)

        quick_s(upper)
        quick_s(lower)

        un_list[:] = lower + [middle] + upper


un_list = [6, 4, 0, 90, 7, 0, 60]
un_list1 = [6, 4, 0, 90, 7, 0, 60]
un_list2 = [6, 4, 0, 90, 7, 0, 60]
# naive_sort(un_list)

s2 = naive_sort2(un_list1)
print(s2)


#print(un_list2)
#print(un_list)



